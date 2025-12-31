import { redirect } from 'next/navigation';

export default function LocaleRootPage() {
  // Since this is a 3D Engine, let's redirect directly to the workbench
  redirect('/en/workbench');
}