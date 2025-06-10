import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../Components/blogslice";
import "../css/blog.css"
import { FaChevronUp } from "react-icons/fa";
function Blog() {
  const dispatch = useDispatch();
  const { blog, status, error } = useSelector((state) => state.blog);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const blogsPerPage = 60;

  const allCategories = [
    "All",
    "Entertainment",
    "Food & Drink",
    "Fashion & Beauty",
    "Art & Culture",
    "Politics & Social Issues",
    "Lifestyle",
    "Education",
    "Sports & Fitness",
    "Finance & Business",
    "Health & Wellness",
    "Travel & Leisure",
    "Programming & Development",
    "Science & Space",
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlog());
    }
  }, [dispatch, status]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filterBlogs = blog.filter((item) => {
    const searchMatch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      !categoryFilter || categoryFilter === "All"
        ? true
        : item.category?.toLowerCase() === categoryFilter.toLowerCase();

    return searchMatch && categoryMatch;
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filterBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filterBlogs.length / blogsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleFirst = () => setCurrentPage(1);
  const handleLast = () => setCurrentPage(totalPages);

  if (status === "loading") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <Alert variant="danger" className="text-center">
        Error: {error}
      </Alert>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold blog-title">Our Latest Blogs</h2>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="Search by title or category..."
        className="mb-4 rounded-4 shadow-sm"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Category Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {allCategories.map((cat, idx) => (
          <Button
            key={idx}
            variant={
              cat === categoryFilter || (cat === "All" && !categoryFilter)
                ? "success"
                : "outline-primary"
            }
            className="rounded-pill px-3 py-1"
            onClick={() => {
              setCategoryFilter(cat === "All" ? "" : cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Blog Cards */}
      <Row xs={1} sm={2} lg={3} className="g-4">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blogs) => (
            <Col key={blogs.id}>
              <Card className="blog-card h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={
                    blogs.featured_image ||
                    "https://via.placeholder.com/300x200"
                  }
                  alt={blogs.title}
                  className="blog-image"
                />
                <Card.Body>
                  <div className="category-badge">{blogs.category}</div>
                  <Card.Title>{blogs.title}</Card.Title>
                  <Card.Text>{blogs.summary?.slice(0, 90)}...</Card.Text>
                </Card.Body>
                <Card.Footer className="blog-footer text-muted small">
                  {new Date(blogs.updated_at).toLocaleDateString()}
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No Blog Data Found
            </Alert>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={handleFirst}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={handlePrev}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={handleNext}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={handleLast}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Back to Top Button */}
      {showScrollBtn && (
        <Button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaChevronUp />
        </Button>
      )}
    </Container>
  );
}

export default Blog;
