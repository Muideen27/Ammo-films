# Database Schema (Optional — Production Applications)

The marketing site works without a database. Applications are validated server-side via `/api/apply` and logged for integration. For production persistence, use the schema below.

## `applications`

| Column        | Type         | Notes                          |
|---------------|--------------|--------------------------------|
| id            | UUID         | Primary key                    |
| full_name     | VARCHAR(100) |                                |
| age           | INTEGER      | CHECK (age >= 18)              |
| city          | VARCHAR(80)  |                                |
| state         | VARCHAR(80)  |                                |
| phone         | VARCHAR(20)  |                                |
| email         | VARCHAR(255) | Indexed                        |
| experience    | TEXT         |                                |
| motivation    | TEXT         |                                |
| age_confirmed | BOOLEAN      | Must be true                   |
| status        | ENUM         | pending, reviewed, shortlisted, rejected |
| created_at    | TIMESTAMPTZ  | Default NOW()                  |
| updated_at    | TIMESTAMPTZ  |                                |

## Example Prisma model

```prisma
model Application {
  id           String   @id @default(uuid())
  fullName     String   @map("full_name")
  age          Int
  city         String
  state        String
  phone        String
  email        String
  experience   String   @db.Text
  motivation   String   @db.Text
  ageConfirmed Boolean  @map("age_confirmed")
  status       String   @default("pending")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("applications")
}
```

Integrate in `src/app/api/apply/route.ts` after connecting your ORM or email/CRM webhook.
