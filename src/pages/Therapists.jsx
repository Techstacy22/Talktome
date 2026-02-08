import { useState } from 'react';
import { Users, Search, Star, MapPin, Clock, Phone, Mail, X, Heart, AlertTriangle } from 'lucide-react';

export default function Therapists() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Trauma"],
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      availability: "Available Today",
      price: "$120-180/session",
      bio: "With over 15 years of experience, I specialize in helping young adults and teens navigate anxiety, depression, and life transitions. My approach combines cognitive-behavioral therapy with mindfulness techniques.",
      image: "👩‍⚕️"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Licensed Therapist, LMFT",
      specialties: ["Relationships", "Family", "Self-Esteem"],
      rating: 4.8,
      reviews: 89,
      location: "Los Angeles, CA",
      availability: "Next Available: Tomorrow",
      price: "$100-150/session",
      bio: "I believe in the power of connection and understanding. Specializing in relationship dynamics and family therapy, I help clients build healthier patterns and stronger bonds.",
      image: "👨‍⚕️"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Clinical Psychologist, Ph.D.",
      specialties: ["Teen Issues", "ADHD", "Academic Stress"],
      rating: 4.9,
      reviews: 156,
      location: "Chicago, IL",
      availability: "Available Today",
      price: "$90-140/session",
      bio: "As a specialist in adolescent psychology, I understand the unique challenges teens face. I create a judgment-free space where young people can explore their thoughts and develop coping strategies.",
      image: "👩‍💼"
    },
    {
      id: 4,
      name: "Dr. James Williams",
      title: "Licensed Counselor, LPC",
      specialties: ["Stress", "Work-Life Balance", "Burnout"],
      rating: 4.7,
      reviews: 72,
      location: "Austin, TX",
      availability: "Available This Week",
      price: "$80-120/session",
      bio: "In today's fast-paced world, burnout is real. I help professionals and students find balance, manage stress, and rediscover purpose in their daily lives.",
      image: "👨‍💼"
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      title: "Trauma Specialist, LCSW",
      specialties: ["Trauma", "PTSD", "Grief"],
      rating: 4.9,
      reviews: 198,
      location: "Miami, FL",
      availability: "Available Today",
      price: "$130-190/session",
      bio: "Healing from trauma is possible. Using EMDR and somatic experiencing, I guide clients through their journey of recovery with compassion and expertise.",
      image: "👩‍⚕️"
    },
    {
      id: 6,
      name: "Dr. David Kim",
      title: "Licensed Psychologist",
      specialties: ["Social Anxiety", "OCD", "Panic Disorders"],
      rating: 4.8,
      reviews: 104,
      location: "Seattle, WA",
      availability: "Next Available: 2 Days",
      price: "$110-160/session",
      bio: "Anxiety doesn't have to control your life. I use evidence-based approaches like ERP and CBT to help clients overcome fears and reclaim their confidence.",
      image: "👨‍⚕️"
    }
  ];

  const specialties = [
    'all', 'Anxiety', 'Depression', 'Trauma', 'Relationships',
    'Teen Issues', 'Stress', 'ADHD', 'Self-Esteem'
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'all' ||
      therapist.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleContact = (therapist) => {
    setSelectedTherapist(therapist);
    setShowContactForm(true);
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();
    alert(`Message sent to ${selectedTherapist.name}! They will respond within 24 hours.`);
    setShowContactForm(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto 30px',
      color: 'white'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: 0.9
    },
    crisisBar: {
      background: 'rgba(255,255,255,0.15)',
      borderRadius: '14px',
      padding: '18px 25px',
      marginTop: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    crisisIcon: {
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '10px',
      padding: '10px',
      display: 'flex'
    },
    crisisText: {
      flex: 1
    },
    crisisTitle: {
      fontWeight: '600',
      marginBottom: '4px'
    },
    crisisNumber: {
      fontSize: '1.3rem',
      fontWeight: '700'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    filtersCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '25px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    searchRow: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap'
    },
    searchInput: {
      flex: '1 1 300px',
      padding: '14px 20px 14px 50px',
      borderRadius: '14px',
      border: '2px solid #e2e8f0',
      fontSize: '1rem',
      outline: 'none',
      position: 'relative'
    },
    searchWrapper: {
      flex: '1 1 300px',
      position: 'relative'
    },
    searchIcon: {
      position: 'absolute',
      left: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#a0aec0'
    },
    specialtyFilter: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '18px'
    },
    filterButton: {
      padding: '10px 18px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    filterActive: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    filterInactive: {
      background: '#f7fafc',
      color: '#4a5568'
    },
    therapistsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '25px'
    },
    therapistCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s ease'
    },
    cardHeader: {
      display: 'flex',
      gap: '18px',
      marginBottom: '18px'
    },
    avatar: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.2rem'
    },
    cardInfo: {
      flex: 1
    },
    therapistName: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '4px'
    },
    therapistTitle: {
      color: '#718096',
      fontSize: '0.9rem',
      marginBottom: '8px'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.9rem'
    },
    ratingValue: {
      fontWeight: '600',
      color: '#ed8936'
    },
    reviews: {
      color: '#a0aec0'
    },
    specialtiesList: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '15px'
    },
    specialty: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      color: '#667eea',
      padding: '6px 14px',
      borderRadius: '10px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    bio: {
      color: '#4a5568',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '18px'
    },
    cardDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#718096',
      fontSize: '0.9rem'
    },
    availability: {
      color: '#48bb78',
      fontWeight: '500'
    },
    contactButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '14px',
      padding: '16px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '35px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '25px'
    },
    modalTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#2d3748'
    },
    closeButton: {
      background: '#f7fafc',
      border: 'none',
      borderRadius: '10px',
      padding: '8px',
      cursor: 'pointer'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#4a5568'
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      fontSize: '1rem',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '14px 18px',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      fontSize: '1rem',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '14px',
      padding: '16px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#718096',
      background: 'white',
      borderRadius: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Users size={40} />
          Find a Therapist
        </h1>
        <p style={styles.subtitle}>
          Connect with licensed professionals who can help
        </p>

        <div style={styles.crisisBar}>
          <div style={styles.crisisIcon}>
            <AlertTriangle size={24} color="white" />
          </div>
          <div style={styles.crisisText}>
            <div style={styles.crisisTitle}>Need immediate help?</div>
            <div>Call or text the 24/7 Crisis Lifeline</div>
          </div>
          <div style={styles.crisisNumber}>988</div>
        </div>
      </div>

      <div style={styles.content}>
        {/* Filters */}
        <div style={styles.filtersCard}>
          <div style={styles.searchRow}>
            <div style={styles.searchWrapper}>
              <Search size={20} style={styles.searchIcon} />
              <input
                style={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search therapists..."
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>
          <div style={styles.specialtyFilter}>
            {specialties.map(specialty => (
              <button
                key={specialty}
                style={{
                  ...styles.filterButton,
                  ...(selectedSpecialty === specialty ? styles.filterActive : styles.filterInactive)
                }}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty === 'all' ? 'All Specialties' : specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Therapists Grid */}
        {filteredTherapists.length === 0 ? (
          <div style={styles.emptyState}>
            <Users size={60} color="#cbd5e0" style={{ marginBottom: '20px' }} />
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>No therapists found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={styles.therapistsGrid}>
            {filteredTherapists.map(therapist => (
              <div
                key={therapist.id}
                style={styles.therapistCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                }}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>{therapist.image}</div>
                  <div style={styles.cardInfo}>
                    <div style={styles.therapistName}>{therapist.name}</div>
                    <div style={styles.therapistTitle}>{therapist.title}</div>
                    <div style={styles.rating}>
                      <Star size={16} color="#ed8936" fill="#ed8936" />
                      <span style={styles.ratingValue}>{therapist.rating}</span>
                      <span style={styles.reviews}>({therapist.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div style={styles.specialtiesList}>
                  {therapist.specialties.map(specialty => (
                    <span key={specialty} style={styles.specialty}>{specialty}</span>
                  ))}
                </div>

                <div style={styles.bio}>{therapist.bio}</div>

                <div style={styles.cardDetails}>
                  <div style={styles.detailItem}>
                    <MapPin size={16} color="#667eea" />
                    {therapist.location}
                  </div>
                  <div style={styles.detailItem}>
                    <Clock size={16} color="#48bb78" />
                    <span style={styles.availability}>{therapist.availability}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <Heart size={16} color="#667eea" />
                    {therapist.price}
                  </div>
                </div>

                <button
                  style={styles.contactButton}
                  onClick={() => handleContact(therapist)}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <Mail size={20} />
                  Contact {therapist.name.split(' ')[1]}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactForm && selectedTherapist && (
        <div style={styles.modal}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>Contact {selectedTherapist.name}</div>
                <div style={{ color: '#718096', marginTop: '5px' }}>
                  {selectedTherapist.title}
                </div>
              </div>
              <button style={styles.closeButton} onClick={() => setShowContactForm(false)}>
                <X size={20} color="#4a5568" />
              </button>
            </div>

            <form onSubmit={handleSubmitContact}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  style={styles.input}
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>What would you like to discuss?</label>
                <textarea
                  style={styles.textarea}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell the therapist a bit about what you're going through..."
                  required
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <button type="submit" style={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
