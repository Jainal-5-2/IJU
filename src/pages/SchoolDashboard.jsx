import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Alert, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getStudentsBySchool, getPendingStudentsBySchool, getApprovedStudentsBySchool } from '../mock/mock_data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SchoolDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0
  });

  useEffect(() => {
    if (user && user.school) {
      loadStudents();
    }
  }, [user]);

  const loadStudents = () => {
    const allStudents = getStudentsBySchool(user.school.id);
    const pending = getPendingStudentsBySchool(user.school.id);
    const approved = getApprovedStudentsBySchool(user.school.id);
    
    setStudents(allStudents);
    setPendingStudents(pending);
    setApprovedStudents(approved);
    setStats({
      total: allStudents.length,
      pending: pending.length,
      approved: approved.length
    });
  };

  const handleVerify = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const confirmVerification = () => {
    // In real app, this would update the backend
    // For mock, we update locally
    const updatedStudent = {
      ...selectedStudent,
      verifiedBySchool: true,
      verificationStatus: 'approved'
    };
    
    // Update local state
    setStudents(students.map(s => 
      s.id === selectedStudent.id ? updatedStudent : s
    ));
    setPendingStudents(pendingStudents.filter(s => s.id !== selectedStudent.id));
    setApprovedStudents([...approvedStudents, updatedStudent]);
    setStats({
      ...stats,
      pending: stats.pending - 1,
      approved: stats.approved + 1
    });
    
    setShowModal(false);
    setMessage(`${selectedStudent.name} has been verified!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReject = (student) => {
    // In real app, this would reject the student
    setMessage(`${student.name} has been rejected.`);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!user || user.role !== 'school_admin') {
    return (
      <>
        <Navbar />
        <Container className="py-5 text-center">
          <h2>Access Denied</h2>
          <p>You don't have permission to view this page.</p>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container fluid className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold">{user.school.name}</h1>
            <p className="text-secondary">School Admin Dashboard</p>
          </div>
          <Badge bg="primary" className="px-3 py-2">
            <i className="bi bi-building me-1"></i> School Admin
          </Badge>
        </div>

        {message && (
          <Alert variant="success" className="mb-4">
            <i className="bi bi-check-circle me-2"></i> {message}
          </Alert>
        )}

        <Row className="g-4 mb-4">
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-primary text-white">
              <Card.Body>
                <i className="bi bi-people fs-1"></i>
                <h3 className="mt-2">{stats.total}</h3>
                <p className="mb-0">Total Registered Students</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-warning text-dark">
              <Card.Body>
                <i className="bi bi-clock-history fs-1"></i>
                <h3 className="mt-2">{stats.pending}</h3>
                <p className="mb-0">Pending Verification</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-success text-white">
              <Card.Body>
                <i className="bi bi-check-circle fs-1"></i>
                <h3 className="mt-2">{stats.approved}</h3>
                <p className="mb-0">Verified Students</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pending Students Section */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-warning bg-opacity-10">
            <h5 className="mb-0">
              <i className="bi bi-clock-history me-2"></i>
              Pending Verification ({stats.pending})
            </h5>
          </Card.Header>
          <Card.Body>
            {pendingStudents.length === 0 ? (
              <p className="text-muted text-center py-4">No pending verifications</p>
            ) : (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Student ID</th>
                    <th>Registered Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingStudents.map(student => (
                    <tr key={student.id}>
                      <td className="fw-semibold">{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <Badge bg={student.role === 'tutor' ? 'success' : 'primary'}>
                          {student.role}
                        </Badge>
                      </td>
                      <td>{student.studentId}</td>
                      <td>{student.registeredAt}</td>
                      <td>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleVerify(student)}
                        >
                          <i className="bi bi-check-lg me-1"></i> Verify
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleReject(student)}
                        >
                          <i className="bi bi-x-lg me-1"></i> Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Verified Students Section */}
        <Card className="shadow-sm">
          <Card.Header className="bg-success bg-opacity-10">
            <h5 className="mb-0">
              <i className="bi bi-check-circle me-2"></i>
              Verified Students ({stats.approved})
            </h5>
          </Card.Header>
          <Card.Body>
            {approvedStudents.length === 0 ? (
              <p className="text-muted text-center py-4">No verified students yet</p>
            ) : (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Student ID</th>
                    <th>Status</th>
                   </tr>
                </thead>
                <tbody>
                  {approvedStudents.map(student => (
                    <tr key={student.id}>
                      <td className="fw-semibold">{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <Badge bg={student.role === 'tutor' ? 'success' : 'primary'}>
                          {student.role}
                        </Badge>
                      </td>
                      <td>{student.studentId}</td>
                      <td>
                        <Badge bg="success">
                          <i className="bi bi-check-circle me-1"></i> Verified
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Verification Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Verify Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Verify <strong>{selectedStudent?.name}</strong> as a legitimate student of <strong>{user.school.name}</strong>?</p>
            <div className="bg-light p-3 rounded mt-3">
              <small>
                <strong>Student Information:</strong><br />
                Email: {selectedStudent?.email}<br />
                Student ID: {selectedStudent?.studentId}<br />
                Role: {selectedStudent?.role}<br />
                Registered: {selectedStudent?.registeredAt}
              </small>
            </div>
            <p className="mt-3 text-success">
              <i className="bi bi-info-circle me-1"></i>
              Once verified, the student can start using the platform.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={confirmVerification}>
              <i className="bi bi-check-lg me-1"></i> Verify Student
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default SchoolDashboard;