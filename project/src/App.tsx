import { useState } from 'react';
import { SettingsProvider } from '@/context/SettingsContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DonationModal } from '@/components/DonationModal';
import { HomePage } from '@/pages/HomePage';
import { ProgramsPage } from '@/pages/ProgramsPage';
import { ImpactPage } from '@/pages/ImpactPage';
import { MediaPage } from '@/pages/MediaPage';
import { StorePage } from '@/pages/StorePage';
import { VolunteerPage } from '@/pages/VolunteerPage';
import { ContactsPage } from '@/pages/ContactsPage';

function AppContent() {
  const { page, navigate } = useRouter();
  const [donationOpen, setDonationOpen] = useState(false);

  const handleDonate = () => setDonationOpen(true);
  const handleJoin = () => navigate('volunteer');

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col">
      <Navbar onDonate={handleDonate} />
      <main className="flex-1">
        {page === 'home' && <HomePage onJoin={handleJoin} onDonate={handleDonate} />}
        {page === 'programs' && <ProgramsPage />}
        {page === 'impact' && <ImpactPage />}
        {page === 'media' && <MediaPage />}
        {page === 'store' && <StorePage />}
        {page === 'volunteer' && <VolunteerPage />}
        {page === 'contacts' && <ContactsPage />}
      </main>
      <Footer />
      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </SettingsProvider>
  );
}

export default App;
