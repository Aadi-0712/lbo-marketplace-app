import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

/*
  ============================================================
  COMPONENT: Login
  PURPOSE: Admin authentication gate.
  
  CHANGE LOG:
  - Updated logo to use <video> tag for .mp4 support.
  - Configured video for autoplay, loop, and muted behavior.
  ============================================================
*/

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // CHANGE LOGO MP4 PATH HERE
  const LOGO_VIDEO_URL = "/logo.mp4"; 

  const login = async () => {
    setIsLoading(true);
    setError("");
    try {
      const auth = getAuth();
      const db = getFirestore();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const adminDoc = await getDoc(doc(db, "admins", uid));

      if (!adminDoc.exists()) {
        setError("Access denied: Not an admin");
        setIsLoading(false);
        return;
      }

      onLogin(userCredential.user);

    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      background: '#f8f9fa',
      padding: 'var(--space-md)',
    },
    card: {
      background: '#ffffff',
      padding: 'var(--space-2xl)',
      borderRadius: 'var(--radius-lg)',
      border: '1.5px solid var(--color-border)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
      width: '100%',
      maxWidth: '440px',
      textAlign: 'center',
    },
    logoContainer: {
      marginBottom: 'var(--space-xl)',
      display: 'flex',
      justifyContent: 'center',
    },
    logoVideo: {
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      backgroundColor: '#000',
    },
    header: {
      marginBottom: 'var(--space-xl)',
    },
    title: {
      fontSize: 'var(--font-size-2xl)',
      fontWeight: '800',
      color: '#000',
      marginBottom: 'var(--space-xs)',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      color: 'var(--color-text-secondary)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: '500',
    },
    inputGroup: {
      textAlign: 'left',
      marginBottom: 'var(--space-lg)',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      color: '#000',
      marginBottom: 'var(--space-sm)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: '700',
    },
    input: {
      width: '100%',
      padding: '16px',
      background: '#ffffff',
      border: '1.5px solid #000000',
      borderRadius: 'var(--radius-md)',
      color: '#000',
      fontSize: 'var(--font-size-base)',
      outline: 'none',
      transition: 'all var(--transition-fast)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    button: {
      width: '100%',
      padding: '18px',
      background: '#000000',
      color: '#ffffff',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--font-size-base)',
      fontWeight: '700',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      marginTop: 'var(--space-md)',
      transition: 'all var(--transition-normal)',
      letterSpacing: '0.05em',
      opacity: isLoading ? 0.7 : 1,
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
    },
    error: {
      background: '#fff0f0',
      color: '#ff4757',
      padding: '12px 16px',
      borderRadius: 'var(--radius-sm)',
      fontSize: '13px',
      marginBottom: 'var(--space-md)',
      border: '1px solid rgba(255,71,87,0.2)',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <video 
            src={LOGO_VIDEO_URL} 
            style={styles.logoVideo}
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to access your admin dashboard</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            placeholder="admin@lbo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.05)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#000'; e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#555'; e.target.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.05)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#000'; e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; }}
          />
        </div>

        <button 
          style={styles.button} 
          onClick={login}
          disabled={isLoading}
          onMouseOver={(e) => { if(!isLoading) { e.target.style.background = '#333333'; e.target.style.transform = 'translateY(-2px)'; } }}
          onMouseOut={(e) => { if(!isLoading) { e.target.style.background = '#000000'; e.target.style.transform = 'translateY(0)'; } }}
        >
          {isLoading ? "Authenticating..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default Login;