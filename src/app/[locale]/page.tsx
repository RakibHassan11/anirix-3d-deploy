import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function LocaleRootPage({ params }: Props) {
  const { locale } = await params;
  
  // Automatically send users to the 3D workbench
  redirect(`/${locale}/workbench`);
}