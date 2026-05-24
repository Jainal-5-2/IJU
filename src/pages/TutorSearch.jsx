import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, InputGroup, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock tutor data
const mockTutors = [
  {
    id: 1,
    name: "Jane Smith",
    email: "tutor@lincoln.edu",
    schoolId: 1,
    schoolName: "Lincoln High School",
    subjects: ["Mathematics", "Algebra", "Calculus"],
    hourlyRate: 350,
    availability: ["Monday 4-6 PM", "Wednesday 4-6 PM", "Saturday 10 AM-12 PM"],
    locationPreference: "both", // online, offline, both
    endorsementBadge: true,
    rating: 4.8,
    totalRatings: 24,
    completedSessions: 48,
    bio: "Senior student passionate about math. Helped 20+ students improve their grades.",
    profileImage: null
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike@lincoln.edu",
    schoolId: 1,
    schoolName: "Lincoln High School",
    subjects: ["Physics", "Chemistry", "General Science"],
    hourlyRate: 400,
    availability: ["Tuesday 3-5 PM", "Thursday 3-5 PM", "Sunday 2-4 PM"],
    locationPreference: "online",
    endorsementBadge: true,
    rating: 4.9,
    totalRatings: 18,
    completedSessions: 36,
    bio: "Science club president. I make complex topics simple!",
    profileImage: null
  },
  {
    id: 3,
    name: "Sarah Lee",
    email: "sarah@lincoln.edu",
    schoolId: 1,
    schoolName: "Lincoln High School",
    subjects: ["English", "Writing", "Literature"],
    hourlyRate: 300,
    availability: ["Monday 3-5 PM", "Wednesday 3-5 PM", "Friday 3-5 PM"],
    locationPreference: "offline",
    endorsementBadge: false,
    rating: 4.5,
    totalRatings: 12,
    completedSessions: 20,
    bio: "Essay writing specialist. Let me help you ace your papers!",
    profileImage: null
  },
  {
    id: 4,
    name: "Alex Chen",
    email: "alex@lincoln.edu",
    schoolId: 1,
    schoolName: "Lincoln High School",
    subjects: ["Computer Science", "Programming", "Web Development"],
    hourlyRate: 450,
    availability: ["Monday 5-7 PM", "Thursday 5-7 PM", "Saturday 2-4 PM"],
    locationPreference: "both",
    endorsementBadge: true,
    rating: 5.0,
    totalRatings: 8,
    completedSessions: 15,
    bio: "Coding enthusiast. I teach JavaScript, Python, and web development.",
    profileImage: null
  }
];

const TutorSearch = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [endorsementOnly, setEndorsementOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // rating, price_low, price_high

  // Get unique subjects from all tutors
  const allSubjects = [...new Set(mockTutors.flatMap(tutor => tutor.subjects))];
  
  // Get unique availability slots
  const allAvailability = [...new Set(mockTutors.flatMap(tutor => tutor.availability))];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTutors(mockTutors);
      setFilteredTutors(mockTutors);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedSubject, selectedAvailability, endorsementOnly, sortBy, tutors]);

  const applyFilters = () => {
    let filtered = [...tutors];

    // Search filter (name, subjects, bio)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(term) ||
        tutor.subjects.some(s => s.toLowerCase().includes(term)) ||
        tutor.bio.toLowerCase().includes(term)
      );
    }

    // Subject filter
    if (selectedSubject) {
      filtered = filtered.filter(tutor => 
        tutor.subjects.includes(selectedSubject)
      );
    }

    // Availability filter
    if (selectedAvailability) {
      filtered = filtered.filter(tutor => 
        tutor.availability.includes(selectedAvailability)
      );
    }

    // Endorsement only filter
    if (endorsementOnly) {
      filtered = filtered.filter(tutor => tutor.endorsementBadge === true);
    }

    // Sorting
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      default:
        break;
    }

    setFilteredTutors(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    setSelectedAvailability('');
    setEndorsementOnly(false);
    setSortBy('rating');
  };

  const getLocationIcon = (preference) => {
    switch(preference) {
      case 'online': return <i className="bi bi-laptop"></i>;
      case 'offline': return <i className="bi bi-building"></i>;
      default: return <i className="bi bi-globe2"></i>;
    }
  };

  const getLocationText = (preference) => {
    switch(preference) {
      case 'online': return 'Online only';
      case 'offline': return 'In-person only';
      default: return 'Online or in-person';
    }
  };

  if (!user || (user.role !== 'tutee' && user.role !== 'student')) {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <h2>Access Denied</h2>
          <p>Please login as a student to search for tutors.</p>
          <Button as={Link} to="/login" variant="primary">Go to Login</Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container fluid className="py-4">
        <Row>
          {/* Sidebar - Filters */}
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-funnel me-2"></i>Filters
                </h5>
              </Card.Header>
              <Card.Body>
                {/* Search Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-search me-1"></i>Search
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name, subject, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>

                {/* Subject Filter */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-book me-1"></i>Subject
                  </Form.Label>
                  <Form.Select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {allSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Availability Filter */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-calendar me-1"></i>Availability
                  </Form.Label>
                  <Form.Select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                  >
                    <option value="">Any Time</option>
                    {allAvailability.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Endorsement Only Toggle */}
                <Form.Group className="mb-4">
                  <Form.Check
                    type="switch"
                    id="endorsement-switch"
                    label={
                      <span>
                        <i className="bi bi-patch-check-fill text-primary me-1"></i>
                        Teacher-endorsed only
                      </span>
                    }
                    checked={endorsementOnly}
                    onChange={(e) => setEndorsementOnly(e.target.checked)}
                  />
                </Form.Group>

                {/* Sort By */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-sort-down me-1"></i>Sort by
                  </Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </Form.Select>
                </Form.Group>

                {/* Clear Filters Button */}
                <Button 
                  variant="outline-secondary" 
                  className="w-100"
                  onClick={clearFilters}
                >
                  <i className="bi bi-x-circle me-1"></i>Clear All Filters
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content - Tutor Cards */}
          <Col lg={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="fw-bold">Find a Tutor</h1>
                <p className="text-secondary mb-0">
                  <i className="bi bi-people me-1"></i>
                  {filteredTutors.length} tutors available
                </p>
              </div>
              <Badge bg="info" className="px-3 py-2">
                <i className="bi bi-building me-1"></i>
                {user.school?.name || 'Your School'}
              </Badge>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-secondary">Loading tutors...</p>
              </div>
            ) : filteredTutors.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <i className="bi bi-search fs-1 text-muted"></i>
                  <h4 className="mt-3">No tutors found</h4>
                  <p className="text-secondary">
                    Try adjusting your filters or search term
                  </p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className="g-4">
                {filteredTutors.map(tutor => (
                  <Col key={tutor.id} md={6} lg={6}>
                    <Card className="h-100 shadow-sm hover-shadow">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center gap-3">
                            <div 
                              className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '60px', height: '60px' }}
                            >
                              <i className="bi bi-person fs-1 text-primary"></i>
                            </div>
                            <div>
                              <h5 className="fw-bold mb-1">{tutor.name}</h5>
                              <div className="d-flex align-items-center gap-2">
                                <div className="text-warning">
                                  {'★'.repeat(Math.floor(tutor.rating))}
                                  {'☆'.repeat(5 - Math.floor(tutor.rating))}
                                </div>
                                <small className="text-secondary">
                                  ({tutor.totalRatings} ratings)
                                </small>
                              </div>
                            </div>
                          </div>
                          {tutor.endorsementBadge && (
                            <Badge bg="primary" className="px-2 py-1">
                              <i className="bi bi-patch-check-fill me-1"></i>
                              Endorsed
                            </Badge>
                          )}
                        </div>

                        <div className="mb-3">
                          <p className="text-secondary small mb-2">{tutor.bio}</p>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {tutor.subjects.slice(0, 3).map(subject => (
                              <Badge key={subject} bg="light" text="dark" className="px-2 py-1">
                                {subject}
                              </Badge>
                            ))}
                            {tutor.subjects.length > 3 && (
                              <Badge bg="light" text="dark">+{tutor.subjects.length - 3}</Badge>
                            )}
                          </div>
                        </div>

                        <div className="border-top pt-3">
                          <Row className="g-2">
                            <Col xs={6}>
                              <small className="text-muted d-block">Hourly Rate</small>
                              <span className="fw-bold text-success fs-5">
                                ₱{tutor.hourlyRate}
                              </span>
                            </Col>
                            <Col xs={6}>
                              <small className="text-muted d-block">Location</small>
                              <span className="small">
                                {getLocationIcon(tutor.locationPreference)} {getLocationText(tutor.locationPreference)}
                              </span>
                            </Col>
                            <Col xs={12} className="mt-2">
                              <small className="text-muted d-block">Availability</small>
                              <span className="small text-secondary">
                                {tutor.availability.slice(0, 2).join(', ')}
                                {tutor.availability.length > 2 && '...'}
                              </span>
                            </Col>
                          </Row>
                        </div>

                        <div className="d-flex gap-2 mt-3">
                          <Button 
                            as={Link} 
                            to={`/booking/${tutor.id}`}
                            variant="primary" 
                            className="flex-grow-1"
                            state={{ tutor }}
                          >
                            <i className="bi bi-calendar-plus me-1"></i>Book Session
                          </Button>
                          <Button 
                            variant="outline-secondary"
                            as={Link}
                            to={`/tutor/${tutor.id}`}
                          >
                            <i className="bi bi-info-circle"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TutorSearch;