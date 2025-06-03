export async function checkCaptcha(recaptchaToken: string) {
  // 1. Verify reCAPTCHA
  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: recaptchaToken,
      }),
    }
  );

  const recaptchaData = await recaptchaRes.json();
  return recaptchaData;
}
