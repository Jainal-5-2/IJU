import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { mockSchools } from '../mock/mock_data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlatformAdminDashboard = () => {
  const { user } = useAuth();
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load schools
    setSchools([...mockSchools]);
  }, []);

  const handleApproveReject = (school, actionType) => {
    setSelectedSchool(school);
    setAction(actionType);
    setShowModal(true);
  };

  const confirmAction = () => {
    // Update school status
    const updatedSchools = schools.map(school => {
      if (school.id === selectedSchool.id) {
        return { 
          ...school, 
          status: action === 'approve' ? 'approved' : 'rejected' 
        };
      }
      return school;
    });
    
    setSchools(updatedSchools);
    setShowModal(false);
    setMessage(`School ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const pendingSchools = schools.filter(s => s.status === 'pending');
  const approvedSchools = schools.filter(s => s.status === 'approved');
  const rejectedSchools = schools.filter(s => s.status === 'rejected');

  if (!user || user.role !== 'platform_admin') {
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
            <h1 className="fw-bold">Platform Admin Dashboard</h1>
            <p className="text-secondary">Welcome back, {user.name}</p>
          </div>
          <Badge bg="danger" className="px-3 py-2">
            <i className="bi bi-shield-lock me-1"></i> Platform Admin
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
                <i className="bi bi-building fs-1"></i>
                <h3 className="mt-2">{schools.length}</h3>
                <p className="mb-0">Total Schools</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-warning text-dark">
              <Card.Body>
                <i className="bi bi-clock-history fs-1"></i>
                <h3 className="mt-2">{pendingSchools.length}</h3>
                <p className="mb-0">Pending Approval</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0 bg-success text-white">
              <Card.Body>
                <i className="bi bi-check-circle fs-1"></i>
                <h3 className="mt-2">{approvedSchools.length}</h3>
                <p className="mb-0">Approved Schools</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Pending Schools Section */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-warning bg-opacity-10">
            <h5 className="mb-0">
              <i className="bi bi-clock-history me-2"></i>
              Schools Pending Approval ({pendingSchools.length})
            </h5>
          </Card.Header>
          <Card.Body>
            {pendingSchools.length === 0 ? (
              <p className="text-muted text-center py-4">No pending schools to review</p>
            ) : (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>School Name</th>
                    <th>Email Domain</th>
                    <th>Contact Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSchools.map(school => (
                    <tr key={school.id}>
                      <td className="fw-semibold">{school.name}</td>
                      <td>{school.emailDomain}</td>
                      <td>{school.schoolAdminEmail}</td>
                      <td>{school.phone || 'N/A'}</td>
                      <td>{school.address || 'N/A'}</td>
                      <td>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleApproveReject(school, 'approve')}
                        >
                          <i className="bi bi-check-lg me-1"></i> Approve
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleApproveReject(school, 'reject')}
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

        {/* Approved Schools Section */}
        <Card className="shadow-sm">
          <Card.Header className="bg-success bg-opacity-10">
            <h5 className="mb-0">
              <i className="bi bi-check-circle me-2"></i>
              Approved Schools ({approvedSchools.length})
            </h5>
          </Card.Header>
          <Card.Body>
            {approvedSchools.length === 0 ? (
              <p className="text-muted text-center py-4">No approved schools yet</p>
            ) : (
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>School Name</th>
                    <th>Email Domain</th>
                    <th>School Admin</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedSchools.map(school => (
                    <tr key={school.id}>
                      <td className="fw-semibold">{school.name}</td>
                      <td>{school.emailDomain}</td>
                      <td>{school.schoolAdminEmail}</td>
                      <td>
                        <Badge bg="success">
                          <i className="bi bi-check-circle me-1"></i> Approved
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {action === 'approve' ? 'Approve School' : 'Reject School'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to {action} <strong>{selectedSchool?.name}</strong>?
            {action === 'approve' && (
              <p className="mt-2 text-success">
                <i className="bi bi-info-circle me-1"></i>
                The school admin will be notified and can start verifying students.
              </p>
            )}
            {action === 'reject' && (
              <p className="mt-2 text-danger">
                <i className="bi bi-exclamation-triangle me-1"></i>
                This action cannot be undone.
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button 
              variant={action === 'approve' ? 'success' : 'danger'} 
              onClick={confirmAction}
            >
              {action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default PlatformAdminDashboard;