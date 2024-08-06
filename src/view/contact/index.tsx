import { ContactForm } from "./form";

export const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col pt-[168px] items-center">
      <div className="w-6/12">
        <h2 className="text-5xl text-center">Contact our sales team</h2>
        <p className="text-neutral-400 text-sm text-center pt-5">
          We’re happy to answer questions and get you acquainted with DVoice,
          including connecting you with helpful resources, exploring use cases
          for your team, and discussing packaging options.
        </p>
      </div>
      <div className="w-1/3 pt-6">
        <ContactForm />
      </div>
    </div>
  );
};
