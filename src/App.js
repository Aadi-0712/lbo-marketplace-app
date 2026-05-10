import { useState } from "react";
import Login from "./Login";
import RequestList from "./components/RequestList";

/*
  ============================================================
  COMPONENT: App
  PURPOSE: Root application component and Dashboard Layout.
  
  CHANGE LOG:
  - Updated logo to use <video> tag for .mp4 support.
  - Configured video for autoplay, loop, and muted behavior.
  ============================================================
*/

function App() {
  const [user, setUser] = useState(null);

  // CHANGE LOGO MP4 PATH HERE
  const LOGO_VIDEO_URL = "/logo.mp4";

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--color-bg-secondary)',
    },
    sidebar: {
      width: 'var(--sidebar-width)',
      background: 'var(--color-sidebar)',
      borderRight: '1.5px solid #eee',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-xl) var(--space-md)',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 100,
      boxShadow: '4px 0 20px rgba(0,0,0,0.02)',
    },
    brand: {
      marginBottom: 'var(--space-2xl)',
      padding: 'var(--space-md)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-sm)',
      background: '#fcfcfc',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid #f0f0f0',
    },
    logoVideo: {
      width: '70px',
      height: '70px',
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)',
      backgroundColor: '#000',
    },
    brandName: {
      fontSize: '16px',
      fontWeight: '800',
      color: '#000',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    nav: {
      flex: 1,
      marginTop: 'var(--space-xl)',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      color: '#fff',
      background: '#000',
      borderRadius: 'var(--radius-md)',
      fontWeight: '700',
      marginBottom: 'var(--space-sm)',
      cursor: 'default',
      textTransform: 'uppercase',
      fontSize: '13px',
      letterSpacing: '0.05em',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px',
      color: '#000',
      background: '#ffffff',
      border: '1.5px solid #000',
      borderRadius: 'var(--radius-md)',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all var(--transition-normal)',
      justifyContent: 'center',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '13px',
    },
    main: {
      flex: 1,
      marginLeft: 'var(--sidebar-width)',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      height: 'var(--header-height)',
      background: '#ffffff',
      borderBottom: '1.5px solid #eee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-2xl)',
      position: 'sticky',
      top: 0,
      zIndex: 90,
    },
    headerLogo: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)',
    },
    headerLogoVideo: {
        width: '56px',
        height: '56px',
        objectFit: 'cover',
        borderRadius: 'var(--radius-md)',
        backgroundColor: '#000',
    },
    headerTitle: {
      fontSize: '18px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    userBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      fontSize: '14px',
      color: '#000',
      fontWeight: '600',
      padding: '8px 16px',
      background: '#f8f9fa',
      borderRadius: 'var(--radius-full)',
      border: '1px solid #eee',
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: '700',
      fontSize: '13px',
      border: '2px solid #fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    content: {
      padding: 'var(--space-2xl)',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    }
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <video 
            src={LOGO_VIDEO_URL} 
            style={styles.logoVideo}
            autoPlay 
            loop 
            muted 
            playsInline
          />
          <div style={styles.brandName}>LBO ADMIN</div>
        </div>
        
        <div style={styles.nav}>
          <div style={styles.navItem}>
            <span style={{marginRight: '12px'}}>📊</span>
            <span>Dashboard</span>
          </div>
        </div>

        <button
          onClick={() => setUser(null)}
          style={styles.logoutBtn}
          onMouseOver={(e) => { e.target.style.background = '#000'; e.target.style.color = '#fff'; e.target.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#000'; e.target.style.transform = 'translateY(0)'; }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>Overview</div>
          
          <div style={styles.headerLogo}>
             <video 
                src={LOGO_VIDEO_URL} 
                style={styles.headerLogoVideo}
                autoPlay 
                loop 
                muted 
                playsInline
             />
             <span style={{fontWeight: '900', fontSize: '18px', letterSpacing: '0.05em'}}>LBO</span>
          </div>

          <div style={styles.userBadge}>
            <span>{user.email}</span>
            <div style={styles.avatar}>AD</div>
          </div>
        </header>

        <div style={styles.content}>
          <RequestList />
        </div>
      </main>
    </div>
  );
}

export default App;