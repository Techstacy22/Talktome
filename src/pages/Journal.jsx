import { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Trash2, Edit3, Save, X, Calendar, Tag } from 'lucide-react';
import { saveJournalEntry, getJournalEntries, updateJournalEntry, deleteJournalEntry, saveMood } from '../utils/localStorage';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEntry, setCurrentEntry] = useState({ content: '', mood: null, tags: [] });
  const [tagInput, setTagInput] = useState('');

  const moods = [
    { emoji: '😊', label: 'Great', score: 9, color: '#48bb78' },
    { emoji: '🙂', label: 'Good', score: 7, color: '#68d391' },
    { emoji: '😐', label: 'Okay', score: 5, color: '#ecc94b' },
    { emoji: '😔', label: 'Low', score: 3, color: '#ed8936' },
    { emoji: '😢', label: 'Sad', score: 2, color: '#fc8181' },
    { emoji: '😰', label: 'Anxious', score: 2, color: '#f6ad55' }
  ];

  const prompts = [
    "What made you smile today?",
    "What's been weighing on your mind?",
    "Describe a moment of peace you experienced recently.",
    "What are you grateful for right now?",
    "If you could tell your younger self one thing, what would it be?",
    "What's a challenge you overcame recently?",
    "How are you really feeling beneath the surface?",
    "What would you do if you weren't afraid?",
    "What patterns have you noticed in your thoughts lately?",
    "What does your ideal day look like?"
  ];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const saved = getJournalEntries();
    setEntries(saved);
  };

  const handleSave = () => {
    if (!currentEntry.content.trim()) return;

    if (editingId) {
      updateJournalEntry(editingId, currentEntry);
    } else {
      saveJournalEntry(currentEntry.content, currentEntry.mood, currentEntry.tags);
      if (currentEntry.mood) {
        saveMood(currentEntry.mood.score, currentEntry.mood.label);
      }
    }

    loadEntries();
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteJournalEntry(id);
      loadEntries();
    }
  };

  const handleEdit = (entry) => {
    setCurrentEntry({
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags || []
    });
    setEditingId(entry.id);
    setIsWriting(true);
  };

  const resetForm = () => {
    setCurrentEntry({ content: '', mood: null, tags: [] });
    setEditingId(null);
    setIsWriting(false);
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !currentEntry.tags.includes(tagInput.trim())) {
      setCurrentEntry(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setCurrentEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      maxWidth: '900px',
      margin: '0 auto 30px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    newButton: {
      background: 'white',
      color: '#667eea',
      border: 'none',
      borderRadius: '14px',
      padding: '14px 28px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    mainCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '35px',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)'
    },
    searchBar: {
      position: 'relative',
      marginBottom: '25px'
    },
    searchInput: {
      width: '100%',
      padding: '14px 20px 14px 50px',
      borderRadius: '14px',
      border: '2px solid #e2e8f0',
      fontSize: '1rem',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#a0aec0'
    },
    writeArea: {
      marginBottom: '30px'
    },
    prompt: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      padding: '18px 22px',
      borderRadius: '14px',
      marginBottom: '20px',
      color: '#667eea',
      fontStyle: 'italic',
      fontSize: '1.05rem'
    },
    textarea: {
      width: '100%',
      minHeight: '250px',
      padding: '20px',
      borderRadius: '14px',
      border: '2px solid #e2e8f0',
      fontSize: '1.05rem',
      lineHeight: '1.7',
      fontFamily: 'inherit',
      resize: 'vertical',
      outline: 'none'
    },
    moodSection: {
      marginTop: '25px'
    },
    sectionLabel: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#4a5568',
      marginBottom: '12px'
    },
    moodGrid: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    moodButton: {
      padding: '12px 20px',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      background: 'white',
      cursor: 'pointer',
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    moodButtonSelected: {
      borderColor: '#667eea',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
    },
    tagSection: {
      marginTop: '25px'
    },
    tagInputRow: {
      display: 'flex',
      gap: '10px',
      marginBottom: '12px'
    },
    tagInput: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '10px',
      border: '2px solid #e2e8f0',
      fontSize: '1rem',
      outline: 'none'
    },
    addTagButton: {
      padding: '12px 20px',
      borderRadius: '10px',
      border: 'none',
      background: '#667eea',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '600'
    },
    tagsDisplay: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    tag: {
      background: '#edf2f7',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    removeTag: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0',
      display: 'flex'
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      marginTop: '30px'
    },
    saveButton: {
      flex: 1,
      padding: '16px',
      borderRadius: '14px',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    cancelButton: {
      padding: '16px 30px',
      borderRadius: '14px',
      border: '2px solid #e2e8f0',
      background: 'white',
      color: '#4a5568',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    entriesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    },
    entryCard: {
      padding: '22px',
      borderRadius: '16px',
      border: '2px solid #e2e8f0',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    entryHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '12px'
    },
    entryDate: {
      color: '#718096',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    entryMood: {
      fontSize: '1.3rem'
    },
    entryContent: {
      color: '#2d3748',
      lineHeight: '1.6',
      marginBottom: '15px',
      whiteSpace: 'pre-wrap'
    },
    entryTags: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '15px'
    },
    entryTag: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      color: '#667eea',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.85rem'
    },
    entryActions: {
      display: 'flex',
      gap: '10px'
    },
    actionButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    editButton: {
      background: '#edf2f7',
      color: '#4a5568'
    },
    deleteButton: {
      background: '#fed7d7',
      color: '#c53030'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#718096'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <BookOpen size={40} />
          Journal
        </h1>
        {!isWriting && (
          <button style={styles.newButton} onClick={() => setIsWriting(true)}>
            <Plus size={20} />
            New Entry
          </button>
        )}
      </div>

      <div style={styles.mainCard}>
        {isWriting ? (
          <div style={styles.writeArea}>
            <div style={styles.prompt}>
              {getRandomPrompt()}
            </div>

            <textarea
              style={styles.textarea}
              value={currentEntry.content}
              onChange={(e) => setCurrentEntry(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Start writing... Express yourself freely."
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />

            <div style={styles.moodSection}>
              <div style={styles.sectionLabel}>How are you feeling?</div>
              <div style={styles.moodGrid}>
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    style={{
                      ...styles.moodButton,
                      ...(currentEntry.mood?.label === mood.label && styles.moodButtonSelected)
                    }}
                    onClick={() => setCurrentEntry(prev => ({ ...prev, mood }))}
                  >
                    <span>{mood.emoji}</span>
                    <span style={{ fontSize: '0.95rem' }}>{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.tagSection}>
              <div style={styles.sectionLabel}>Add Tags</div>
              <div style={styles.tagInputRow}>
                <input
                  style={styles.tagInput}
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add a tag..."
                />
                <button style={styles.addTagButton} onClick={addTag}>
                  <Tag size={18} />
                </button>
              </div>
              <div style={styles.tagsDisplay}>
                {currentEntry.tags.map((tag) => (
                  <div key={tag} style={styles.tag}>
                    {tag}
                    <button style={styles.removeTag} onClick={() => removeTag(tag)}>
                      <X size={14} color="#718096" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button style={styles.saveButton} onClick={handleSave}>
                <Save size={20} />
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
              <button style={styles.cancelButton} onClick={resetForm}>
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={styles.searchBar}>
              <Search size={20} style={styles.searchIcon} />
              <input
                style={styles.searchInput}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entries..."
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div style={styles.entriesList}>
              {filteredEntries.length === 0 ? (
                <div style={styles.emptyState}>
                  <BookOpen size={60} color="#cbd5e0" style={{ marginBottom: '20px' }} />
                  <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>
                    {searchQuery ? 'No entries found' : 'Your journal is empty'}
                  </h3>
                  <p>
                    {searchQuery ? 'Try a different search term' : 'Start writing to capture your thoughts'}
                  </p>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    style={styles.entryCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={styles.entryHeader}>
                      <div style={styles.entryDate}>
                        <Calendar size={14} />
                        {formatDate(entry.createdAt)}
                      </div>
                      {entry.mood && (
                        <div style={styles.entryMood}>{entry.mood.emoji}</div>
                      )}
                    </div>

                    <div style={styles.entryContent}>
                      {entry.content.length > 300
                        ? entry.content.substring(0, 300) + '...'
                        : entry.content}
                    </div>

                    {entry.tags?.length > 0 && (
                      <div style={styles.entryTags}>
                        {entry.tags.map(tag => (
                          <span key={tag} style={styles.entryTag}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <div style={styles.entryActions}>
                      <button
                        style={{ ...styles.actionButton, ...styles.editButton }}
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>
                      <button
                        style={{ ...styles.actionButton, ...styles.deleteButton }}
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
