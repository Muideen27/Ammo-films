# Ammofilms Deployment Guide

This guide provides comprehensive instructions for setting up Supabase, developing locally, deploying the application to production, and configuring Namecheap hosting.

## Supabase Setup

1.  **Create Project**: 
    - Go to [Supabase](https://supabase.com/) and sign up or log in.
    - Click "New Project" and follow the prompts to create a new project. Choose a strong password for your database.

2.  **Configure Database**: 
    - Once your project is created, navigate to "Database" > "Table Editor".
    - You will apply the migration script to create the `applications` table.

3.  **Run Migrations**: 
    - In your local development environment, navigate to the project root.
    - The migration script `supabase/migrations/create_applications_table.sql` needs to be applied to your Supabase project. You can do this in several ways:
        - **Supabase Dashboard**: Go to "SQL Editor" and paste the contents of `supabase/migrations/create_applications_table.sql` and run it.
        - **Supabase CLI**: If you have the Supabase CLI installed, you can link your project and run `supabase db push`.

    The `create_applications_table.sql` script will create the `applications` table with the following schema:
    ```sql
    CREATE TABLE applications (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      full_name TEXT NOT NULL,
      age INTEGER NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      experience TEXT NOT NULL,
      motivation TEXT NOT NULL,
      status TEXT DEFAULT 'new' NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
    );

    ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Allow anon insert" ON applications FOR INSERT WITH CHECK (true);
    ```

4.  **Configure Environment Variables**: 
    - In your Supabase project settings, go to "API" to find your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
    - For the service role key, go to "Authentication" > "Settings" > "API Keys" and find the `service_role` key. **Never expose this key to the client-side.**
    - Create a `.env.local` file in the root of your project (for local development) and add the following:
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
    ```
    - Replace the placeholder values with your actual Supabase project credentials.

## Local Development

1.  **Install dependencies**: 
    ```bash
    npm install
    # or yarn install
    ```

2.  **Configure `.env.local`**: 
    - Ensure your `.env.local` file is set up as described in the "Configure Environment Variables" section above.

3.  **Run development server**: 
    ```bash
    npm run dev
    # or yarn dev
    ```
    - The application will be accessible at `http://localhost:3000` (or another port if specified).

4.  **Test submissions**: 
    - Fill out the application form on the frontend.
    - Submit the form and verify that the data appears in your Supabase `applications` table.
    - Check your browser's console and network tab for any errors during submission.

## Production Deployment

This section assumes you are deploying to a platform that supports Next.js (e.g., Vercel, Netlify, or a custom server).

1.  **Build application**: 
    ```bash
    npm run build
    # or yarn build
    ```
    - This command creates an optimized production build of your application in the `.next` directory.

2.  **Configure production environment variables**: 
    - When deploying to production, you will need to configure your environment variables on your hosting platform.
    - Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` with your production Supabase credentials. **Ensure `SUPABASE_SERVICE_ROLE_KEY` is kept secret and not exposed client-side.**

3.  **Deploy application**: 
    - Follow your hosting provider's instructions to deploy the Next.js application.

4.  **Verify database connectivity**: 
    - After deployment, test the application form on the live site.
    - Confirm that new submissions are successfully saved to your Supabase `applications` table.

## Namecheap Hosting (Example with a VPS/Custom Server)

Deploying a Next.js application to a Namecheap VPS or custom server typically involves setting up a Node.js environment, a process manager, and a reverse proxy. This is a general guide; specific steps may vary based on your server setup and preferences.

1.  **Prepare your VPS**: 
    - SSH into your Namecheap VPS.
    - Update your server: `sudo apt update && sudo apt upgrade -y`
    - Install Node.js and npm (e.g., using `nvm` or a package manager).
    - Install a process manager like PM2: `npm install -g pm2`
    - Install a web server like Nginx (to act as a reverse proxy): `sudo apt install nginx -y`

2.  **Deploy the Next.js application**: 
    - Transfer your built Next.js application files (the contents of the `.next` folder, `public`, `package.json`, etc.) to your VPS. A common approach is to clone your Git repository directly onto the server and then run `npm install` and `npm run build` on the server.
    - Navigate to your application directory on the VPS.
    - Install dependencies: `npm install`
    - Build the application: `npm run build`

3.  **Configure Environment Variables on Server**: 
    - Create an `.env` file in your application's root directory on the VPS.
    - Add your production `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to this file.

4.  **Start the application with PM2**: 
    ```bash
    pm2 start npm --name "ammofilms-app" -- start
    pm2 save
    ```
    - This starts your Next.js application in production mode and keeps it running.

5.  **Configure Nginx as a Reverse Proxy**: 
    - Create an Nginx configuration file for your domain (e.g., `/etc/nginx/sites-available/yourdomain.com`):
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        location / {
            proxy_pass http://localhost:3000; # Or whatever port your Next.js app is running on
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
    - Create a symbolic link to `sites-enabled`: `sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/`
    - Test Nginx configuration: `sudo nginx -t`
    - Restart Nginx: `sudo systemctl restart nginx`

6.  **Connecting Custom Domain**: 
    - In your Namecheap account, go to "Domain List" and manage your domain.
    - Update your domain's DNS records to point to your VPS IP address. Typically, this involves setting an `A` record for `@` and `www` to your server's IP.
    - DNS changes can take up to 48 hours to propagate.

7.  **Enabling HTTPS (with Certbot/Let's Encrypt)**: 
    - Install Certbot: `sudo apt install certbot python3-certbot-nginx -y`
    - Run Certbot for Nginx: `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`
    - Follow the prompts. Certbot will automatically configure Nginx for HTTPS and set up automatic renewals.
    - Verify HTTPS by visiting your domain with `https://`.

8.  **Verifying production form submissions**: 
    - Access your deployed application via your custom domain.
    - Submit the application form.
    - Log in to your Supabase project and verify that the new application records are present in the `applications` table.

This completes the deployment guide. Remember to always keep your `SUPABASE_SERVICE_ROLE_KEY` confidential and never expose it in client-side code.
