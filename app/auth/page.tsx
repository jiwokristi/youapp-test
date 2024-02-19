import AuthForm from './Form';
import FormHeader from './FormHeader';

export default function Page() {
  return (
    <section
      id="Page__Auth"
      className="flex min-h-screen flex-col items-center py-96 smaller-tablets:justify-center landscape-tablets:py-48"
    >
      <AuthForm>
        <FormHeader />
      </AuthForm>
    </section>
  );
}
