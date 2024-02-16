import SignInForm from '@/features/sign-in/Form';

export default function Page() {
  return (
    <section
      id="Page__SignIn"
      className="py-64 smaller-tablets:!px-48 landscape-tablets:py-96"
    >
      <div className="mx-auto grid grid-cols-1 overflow-hidden rounded-3xl shadow-soft landscape-tablets:grid-cols-[6fr_4fr]">
        <SignInForm />
        {/* Todo: Change the background image to a landscape picture when the elements are being stacked vertically, and to a portrait picture when the elements are side by side. */}
        <div className="row-start-1 h-[16rem] bg-sign-in bg-cover bg-center smaller-tablets:h-[32rem] tablets:h-[48rem] landscape-tablets:col-start-2 landscape-tablets:h-auto">
          &nbsp;
        </div>
      </div>
    </section>
  );
}
