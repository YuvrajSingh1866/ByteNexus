import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Video, FileQuestion, Globe, Library, 
  FlaskConical, ClipboardList, GraduationCap, 
  Bookmark, BookmarkCheck, Share2, Search, ArrowLeft,
  Clock, ExternalLink, Heart
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/subjectDetail.css";

const SECTION_CONFIG = [
  { id: 'notes', title: 'Notes', icon: BookOpen, key: 'notes' },
  { id: 'videos', title: 'Video Lectures', icon: Video, key: 'videoResources' },
  { id: 'pyqs', title: 'PYQs', icon: FileQuestion, key: 'pyqs' },
  { id: 'assignments', title: 'Assignments', icon: ClipboardList, key: 'assignments' },
  { id: 'exam', title: 'Exam Prep', icon: GraduationCap, keys: ['importantQuestions', 'cho'] },
  { id: 'websites', title: 'Useful Websites', icon: Globe, key: 'websites' },
  { id: 'books', title: 'Recommended Books', icon: Library, key: 'books' },
  { id: 'labs', title: 'Practicals & Lab Work', icon: FlaskConical, key: 'labs' },
];

const SkeletonLoader = () => (
  <div className="skeleton-container">
    <div className="skeleton-hero"></div>
    <div className="skeleton-controls"></div>
    <div className="skeleton-grid">
      {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton-card"></div>)}
    </div>
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 20 } 
  }
};

const SubjectDetail = () => {
  const { name: slug } = useParams();
  const location = useLocation();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isFavorite, setIsFavorite] = useState(false);

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('byteNexus_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyOpened, setRecentlyOpened] = useState(() => {
    const saved = localStorage.getItem('byteNexus_recent');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('byteNexus_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('byteNexus_recent', JSON.stringify(recentlyOpened));
  }, [recentlyOpened]);

  useEffect(() => {
    const fetchSubject = async () => {
      setLoading(true);
      const type = location.state?.type;
      try {
        if (type) {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subjects/${type}/${slug}`);
          if (res.ok) {
            setSubject(await res.json());
            setLoading(false);
            return;
          }
        }
        const resFirst = await fetch(`${import.meta.env.VITE_API_URL}/api/subjects/first-year/${slug}`);
        if (resFirst.ok) {
          setSubject(await resFirst.json());
          setLoading(false);
          return;
        }
        const resSecond = await fetch(`${import.meta.env.VITE_API_URL}/api/subjects/second-year/${slug}`);
        if (resSecond.ok) {
          setSubject(await resSecond.json());
          setLoading(false);
          return;
        }
        setSubject(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subject:", err);
        setSubject(null);
        setLoading(false);
      }
    };
    fetchSubject();
  }, [slug, location.state?.type]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="sd-page-wrapper"><SkeletonLoader /></div>
      </>
    );
  }

  if (!subject) {
    return (
      <>
        <Navbar />
        <div className="sd-empty-wrapper">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="sd-empty-state"
          >
            <div className="sd-empty-icon-wrapper">
              <FileQuestion size={48} className="sd-empty-icon" />
            </div>
            <h2>Subject Not Found</h2>
            <p>We couldn't locate the resources for this subject. It may have been moved or doesn't exist.</p>
            <Link to="/subjects" className="sd-back-btn">
              <ArrowLeft size={18} /> Return to Subjects
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  const handleResourceClick = (res) => {
    setRecentlyOpened(prev => {
      const filtered = prev.filter(r => r.link !== res.link);
      return [res, ...filtered].slice(0, 5);
    });
  };

  const toggleBookmark = (e, res) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks(prev => {
      const isBookmarked = prev.some(b => b.link === res.link);
      if (isBookmarked) return prev.filter(b => b.link !== res.link);
      return [...prev, res];
    });
  };

  const copyLink = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link);
    
    // Quick visual feedback on the button
    const btn = e.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `<span style="color: var(--accent-green); font-size: 12px; font-weight: bold;">Copied!</span>`;
    setTimeout(() => { btn.innerHTML = originalHtml; }, 1500);
  };

  const scrollToSection = (id) => {
    setActiveTab('all');
    setTimeout(() => {
      const el = document.getElementById(`section-${id}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 120; // Offset for navbar
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const getAllResources = () => {
    let all = [];
    SECTION_CONFIG.forEach(sec => {
      const items = sec.keys 
        ? sec.keys.flatMap(k => subject.resources?.[k] || []) 
        : (subject.resources?.[sec.key] || []);
      
      const mapped = items.map(item => ({ ...item, sectionId: sec.id, sectionTitle: sec.title, Icon: sec.icon }));
      all = [...all, ...mapped];
    });
    return all;
  };

  const allResources = getAllResources();
  const totalCount = allResources.length;

  const filteredResources = allResources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || activeTab === 'recent' || activeTab === 'bookmarks' || res.sectionId === activeTab;
    
    if (activeTab === 'recent') {
      return recentlyOpened.some(r => r.link === res.link) && matchesSearch;
    }
    if (activeTab === 'bookmarks') {
      return bookmarks.some(b => b.link === res.link) && matchesSearch;
    }
    
    return matchesSearch && matchesTab;
  });

  const groupedResources = filteredResources.reduce((acc, res) => {
    if (!acc[res.sectionId]) acc[res.sectionId] = { title: res.sectionTitle, Icon: res.Icon, items: [] };
    acc[res.sectionId].items.push(res);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="sd-main">
        {/* Animated Background Gradients & Particles */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="sd-bg-gradient sd-bg-1" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="sd-bg-gradient sd-bg-2" 
        />
        <div className="sd-bg-pattern"></div>

        <div className="sd-container">
          <Link to="/subjects" className="sd-back-link group">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Subjects</span>
          </Link>

          {/* Cinematic Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sd-hero"
          >
            <div className="sd-hero-content">
              <div className="sd-hero-glass-overlay"></div>
              <div className="sd-hero-header">
                <div className="sd-title-wrapper">
                  <h1 className="sd-title">{subject.name}</h1>
                  <motion.div 
                    className="sd-title-glow"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  ></motion.div>
                </div>
                <button 
                  className={`sd-fav-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
              <p className="sd-desc">{subject.description}</p>
              
              <div className="sd-stats">
                <div className="sd-stat-badge">
                  <span className="sd-stat-dot"></span>
                  {totalCount} Total Resources
                </div>
                {recentlyOpened.length > 0 && (
                  <div className="sd-stat-badge secondary">
                    <Clock size={14} /> {recentlyOpened.length} Recently Opened
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Controls: Search & Tabs */}
          <div className="sd-controls-wrapper">
            <div className="sd-search-bar">
              <Search className="sd-search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search notes, videos, assignments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <div className="sd-search-glow"></div>
              )}
            </div>
            
            <div className="sd-tabs-container">
              <div className="sd-tabs">
                <button 
                  className={`sd-tab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                  {activeTab === 'all' && <motion.div layoutId="tab-indicator" className="sd-tab-indicator" />}
                </button>
                <button 
                  className={`sd-tab ${activeTab === 'recent' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recent')}
                >
                  <Clock size={16} /> Recent
                  {activeTab === 'recent' && <motion.div layoutId="tab-indicator" className="sd-tab-indicator" />}
                </button>
                <button 
                  className={`sd-tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookmarks')}
                >
                  <Bookmark size={16} /> Saved
                  {activeTab === 'bookmarks' && <motion.div layoutId="tab-indicator" className="sd-tab-indicator" />}
                </button>
                <div className="sd-tab-divider"></div>
                {SECTION_CONFIG.map(sec => {
                  const count = allResources.filter(r => r.sectionId === sec.id).length;
                  if (count === 0) return null;
                  return (
                    <button 
                      key={sec.id}
                      className={`sd-tab ${activeTab === sec.id ? 'active' : ''}`}
                      onClick={() => activeTab === 'all' ? scrollToSection(sec.id) : setActiveTab(sec.id)}
                      title={`Scroll to ${sec.title}`}
                    >
                      <sec.icon size={16} /> {sec.title}
                      {activeTab === sec.id && <motion.div layoutId="tab-indicator" className="sd-tab-indicator" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resources Content */}
          <div className="sd-content">
            <AnimatePresence mode="popLayout">
              {Object.keys(groupedResources).length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="sd-empty-state"
                >
                  <div className="sd-empty-icon-wrapper">
                    <Search size={48} className="sd-empty-icon" />
                  </div>
                  <h3>No resources found</h3>
                  <p>Try adjusting your search criteria or explore different tabs.</p>
                </motion.div>
              ) : (
                Object.values(groupedResources).map((group, idx) => (
                  <motion.div 
                    key={group.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="sd-section"
                    id={`section-${Object.keys(groupedResources)[idx]}`}
                  >
                    <div className="sd-section-header">
                      <h2 className="sd-section-title">
                        <div className="sd-icon-box">
                          <group.Icon size={20} />
                        </div>
                        {group.title}
                        <span className="sd-section-count">{group.items.length}</span>
                      </h2>
                      <div className="sd-section-line"></div>
                    </div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="sd-grid"
                    >
                      {group.items.map((res, i) => {
                        const isBookmarked = bookmarks.some(b => b.link === res.link);
                        return (
                          <motion.a
                            variants={itemVariants}
                            href={res.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                            className="sd-card group"
                            onClick={() => handleResourceClick(res)}
                          >
                            <div className="sd-card-glass"></div>
                            <div className="sd-card-content">
                              <div className="sd-card-header">
                                <span className="sd-type-badge">
                                  <span className="sd-type-dot"></span>
                                  {res.type}
                                </span>
                                <div className="sd-card-actions">
                                  <button className="sd-action-btn" title="Copy Link" onClick={(e) => copyLink(e, res.link)}>
                                    <Share2 size={16} />
                                  </button>
                                  <button className="sd-action-btn" title="Save Resource" onClick={(e) => toggleBookmark(e, res)}>
                                    {isBookmarked ? <BookmarkCheck size={16} className="text-green" /> : <Bookmark size={16} />}
                                  </button>
                                </div>
                              </div>
                              <h3 className="sd-card-title">{res.title}</h3>
                              <div className="sd-card-footer">
                                <span className="sd-view-link">
                                  Access Resource <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                              </div>
                            </div>
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SubjectDetail;
