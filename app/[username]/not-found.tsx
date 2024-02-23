import { Back } from '@/components/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-32 py-96 smaller-tablets:justify-center landscape-tablets:py-48">
      <span className="text-30 font-bold">WHOOPS!</span>
      <p className="mb-24 text-14">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Back />
    </div>
  );
}
