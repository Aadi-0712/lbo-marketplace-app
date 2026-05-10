import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where
} from "firebase/firestore";

/*
  ============================================================
  COMPONENT: RequestList
  PURPOSE: Fetches and displays pending service provider requests.
  
  CHANGE LOG:
  - Added CURVED edges to cards, avatars, badges, and inner grid items.
  - Improved contrast and visual hierarchy.
  - Refined the "D9D9D9" card style to look more modern with rounded corners.
  ============================================================
*/

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const q = query(
      collection(db, "provider_requests"),
      where("status", "==", "PENDING")
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setRequests(data);
  };

  const approve = async (userId, requestId) => {
    setProcessingId(requestId);
    try {
      await updateDoc(doc(db, "users", userId), {
        role: "SERVICE_PROVIDER"
      });

      await updateDoc(doc(db, "provider_requests", requestId), {
        status: "APPROVED"
      });

      fetchRequests();
    } catch (error) {
      console.error("Approve Error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const reject = async (requestId) => {
    setProcessingId(requestId);
    try {
      await updateDoc(doc(db, "provider_requests", requestId), {
        status: "REJECTED"
      });

      fetchRequests();
    } catch (error) {
      console.error("Reject Error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const styles = {
    container: {
      width: '100%',
    },
    title: {
      fontSize: '24px',
      fontWeight: '800',
      marginBottom: 'var(--space-xl)',
      color: '#000',
      letterSpacing: '-0.02em',
    },
    emptyState: {
      textAlign: 'center',
      padding: 'var(--space-2xl)',
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '2px dashed #eee',
      color: 'var(--color-text-secondary)',
      fontWeight: '600',
    },
    card: {
      background: '#D9D9D9',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-xl)',
      marginBottom: 'var(--space-xl)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      border: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      transition: 'all var(--transition-normal)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      marginBottom: 'var(--space-sm)',
    },
    avatar: {
      width: '64px',
      height: '64px',
      borderRadius: 'var(--radius-md)',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: '800',
      fontSize: '20px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    },
    nameInfo: {
      flex: 1,
    },
    name: {
      fontSize: '20px',
      fontWeight: '800',
      color: '#000',
    },
    badge: {
      display: 'inline-block',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: '11px',
      fontWeight: '800',
      textTransform: 'uppercase',
      background: '#000',
      color: '#fff',
      marginTop: '8px',
      letterSpacing: '0.05em',
    },
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'var(--space-md)',
      padding: 'var(--space-lg)',
      background: '#ffffff',
      borderRadius: 'var(--radius-md)',
      border: '1px solid rgba(0,0,0,0.05)',
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    detailLabel: {
      fontSize: '11px',
      color: 'var(--color-text-secondary)',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    detailValue: {
      fontSize: '15px',
      color: '#000',
      fontWeight: '700',
    },
    description: {
      fontSize: '14px',
      color: '#333',
      fontStyle: 'italic',
      lineHeight: '1.6',
      background: '#ffffff',
      padding: '20px',
      borderRadius: 'var(--radius-md)',
      borderLeft: '5px solid #000',
    },
    actions: {
      display: 'flex',
      gap: 'var(--space-md)',
      marginTop: 'var(--space-sm)',
    },
    approveBtn: {
      flex: 1,
      padding: '16px',
      borderRadius: 'var(--radius-md)',
      background: '#000000',
      color: '#fff',
      border: 'none',
      fontWeight: '800',
      cursor: processingId ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-normal)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '13px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
    rejectBtn: {
      flex: 1,
      padding: '16px',
      borderRadius: 'var(--radius-md)',
      background: '#ffffff',
      color: '#000',
      border: '2px solid #000',
      fontWeight: '800',
      cursor: processingId ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-normal)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontSize: '13px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Provider Requests</h2>

      {requests.length === 0 ? (
        <div style={styles.emptyState}>
          <p>Everything is up to date. No pending requests.</p>
        </div>
      ) : (
        requests.map(req => (
          <div
            key={req.id}
            style={styles.card}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'; }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.avatar}>{getInitials(req.name)}</div>
              <div style={styles.nameInfo}>
                <div style={styles.name}>{req.name || "Unknown Provider"}</div>
                <div style={styles.badge}>{req.serviceType || "General"}</div>
              </div>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Email Address</span>
                <span style={styles.detailValue}>{req.email}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Experience</span>
                <span style={styles.detailValue}>{req.experience} Years</span>
              </div>
            </div>

            {req.description && (
              <div style={styles.description}>
                "{req.description}"
              </div>
            )}

            <div style={styles.actions}>
              <button
                disabled={processingId !== null}
                onClick={() => approve(req.userId, req.id)}
                style={styles.approveBtn}
                onMouseOver={(e) => { if(!processingId) { e.target.style.background = '#333'; e.target.style.transform = 'translateY(-2px)'; } }}
                onMouseOut={(e) => { if(!processingId) { e.target.style.background = '#000'; e.target.style.transform = 'translateY(0)'; } }}
              >
                {processingId === req.id ? "Working..." : "✅ Approve"}
              </button>

              <button
                disabled={processingId !== null}
                onClick={() => reject(req.id)}
                style={styles.rejectBtn}
                onMouseOver={(e) => { if(!processingId) { e.target.style.background = '#000'; e.target.style.color = '#fff'; e.target.style.transform = 'translateY(-2px)'; } }}
                onMouseOut={(e) => { if(!processingId) { e.target.style.background = '#ffffff'; e.target.style.color = '#000'; e.target.style.transform = 'translateY(0)'; } }}
              >
                {processingId === req.id ? "Working..." : "❌ Reject"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RequestList;