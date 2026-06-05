"use client";

import { IMAGES } from "@/lib/constants";
import {
  APPLICATION_STORAGE_KEY,
  applicationSchema,
  FORM_STEPS,
  type ApplicationFormData,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues: ApplicationFormData = {
  fullName: "",
  age: 18,
  city: "",
  state: "",
  phone: "",
  email: "",
  experience: "",
  motivation: "",
  ageConfirmed: false,
};

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [savedHint, setSavedHint] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const loadDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(APPLICATION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ApplicationFormData> & {
          step?: number;
        };
        Object.entries(parsed).forEach(([key, value]) => {
          if (key !== "step" && value !== undefined) {
            setValue(key as keyof ApplicationFormData, value as never);
          }
        });
        if (parsed.step && parsed.step >= 1 && parsed.step <= FORM_STEPS.length) {
          setStep(parsed.step);
        }
      }
    } catch {
      /* ignore corrupt draft */
    }
  }, [setValue]);

  useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  const saveDraft = useCallback(() => {
    const values = watch();
    try {
      localStorage.setItem(
        APPLICATION_STORAGE_KEY,
        JSON.stringify({ ...values, step })
      );
      setSavedHint(true);
      setTimeout(() => setSavedHint(false), 2500);
    } catch {
      /* storage full or unavailable */
    }
  }, [watch, step]);

  useEffect(() => {
    const subscription = watch(() => {
      const values = watch();
      try {
        localStorage.setItem(
          APPLICATION_STORAGE_KEY,
          JSON.stringify({ ...values, step })
        );
      } catch {
        /* ignore */
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, step]);

  const currentStep = FORM_STEPS[step - 1];
  const progress = (step / FORM_STEPS.length) * 100;

  const goNext = async () => {
    const fields = [...currentStep.fields] as (keyof ApplicationFormData)[];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, FORM_STEPS.length));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      localStorage.removeItem(APPLICATION_STORAGE_KEY);
      setSubmitted(true);
    } catch {
      localStorage.removeItem(APPLICATION_STORAGE_KEY);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="apply" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-100 bg-white p-10 shadow-luxury"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-10 w-10" aria-hidden />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-primary">
              Application Submitted
            </h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              Thank you for applying to Ammofilms. Our recruitment team will review your
              application and contact you if you are shortlisted for the next stage.
            </p>
            <p className="mt-4 text-sm text-foreground/60">
              Please ensure your phone and email are active. Response times may vary based on
              application volume.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="bg-slate-50 py-20 sm:py-28" aria-labelledby="apply-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Apply"
          title="Start Your Global Journey"
          description="Complete our secure multi-step application. Your progress is saved automatically on this device."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <div className="hidden lg:block lg:col-span-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-luxury sticky top-28">
              <Image
                src={IMAGES.application}
                alt="Professional creator preparing for an international streaming career"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-luxury sm:p-10"
              role="form"
              aria-labelledby="apply-heading"
            >
              <h2 id="apply-heading" className="sr-only">
                Application form
              </h2>

              <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-primary mb-2">
                  <span>
                    Step {step} of {FORM_STEPS.length}: {currentStep.title}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Application progress"
                >
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {FORM_STEPS.map((s) => (
                    <span
                      key={s.id}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        s.id === step
                          ? "bg-accent/20 text-primary"
                          : s.id < step
                            ? "bg-success/15 text-success"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {step === 1 && (
                      <>
                        <Input
                          label="Full Name"
                          placeholder="Enter your full legal name"
                          autoComplete="name"
                          {...register("fullName")}
                          error={errors.fullName?.message}
                        />
                        <Input
                          label="Age"
                          type="number"
                          min={18}
                          max={65}
                          placeholder="18"
                          {...register("age")}
                          error={errors.age?.message}
                          hint="Must be 18 years or older"
                        />
                        <label className="flex items-start gap-3 rounded-xl border-2 border-accent/30 bg-accent/5 p-4 cursor-pointer touch-manipulation">
                          <input
                            type="checkbox"
                            className="mt-1 h-5 w-5 rounded border-slate-300 text-accent focus:ring-accent"
                            {...register("ageConfirmed")}
                            aria-describedby="age-confirm-hint"
                          />
                          <span>
                            <span className="font-semibold text-primary">
                              I confirm I am 18 years of age or older
                            </span>
                            <span
                              id="age-confirm-hint"
                              className="block mt-1 text-sm text-foreground/70"
                            >
                              Required. Age verification will be conducted during onboarding.
                            </span>
                          </span>
                        </label>
                        {errors.ageConfirmed && (
                          <p role="alert" className="text-sm text-red-600">
                            {errors.ageConfirmed.message}
                          </p>
                        )}
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <Input
                          label="City"
                          placeholder="e.g. Lagos"
                          autoComplete="address-level2"
                          {...register("city")}
                          error={errors.city?.message}
                        />
                        <Input
                          label="State"
                          placeholder="e.g. Lagos State"
                          autoComplete="address-level1"
                          {...register("state")}
                          error={errors.state?.message}
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <Input
                          label="Phone"
                          type="tel"
                          placeholder="+234 ..."
                          autoComplete="tel"
                          {...register("phone")}
                          error={errors.phone?.message}
                        />
                        <Input
                          label="Email"
                          type="email"
                          placeholder="you@email.com"
                          autoComplete="email"
                          {...register("email")}
                          error={errors.email?.message}
                        />
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <Textarea
                          label="Experience"
                          placeholder="Tell us about any modeling, content creation, or streaming experience..."
                          rows={5}
                          {...register("experience")}
                          error={errors.experience?.message}
                        />
                        <Textarea
                          label="Motivation"
                          placeholder="Why do you want to join Ammofilms and build a global streaming career?"
                          rows={5}
                          {...register("motivation")}
                          error={errors.motivation?.message}
                        />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary min-h-[44px] touch-manipulation"
                  >
                    <Save className="h-4 w-4" aria-hidden />
                    {savedHint ? "Progress saved" : "Save progress"}
                  </button>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        className="w-full sm:w-auto"
                      >
                        <ChevronLeft className="h-5 w-5 mr-1" aria-hidden />
                        Back
                      </Button>
                    )}
                    {step < FORM_STEPS.length ? (
                      <Button
                        type="button"
                        onClick={goNext}
                        className="w-full sm:w-auto"
                      >
                        Continue
                        <ChevronRight className="h-5 w-5 ml-1" aria-hidden />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
