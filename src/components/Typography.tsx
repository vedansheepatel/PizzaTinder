import styled from "styled-components";

// Title: big, bold
export const Title = styled.h1`
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 3rem; /* adjust for responsiveness */
  text-align: center;
  margin: 0.5rem 0;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

// Subtitle / smaller header
export const Subtitle = styled.h2`
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  text-align: center;
  color: #555;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Paragraph
export const Paragraph = styled.p`
  font-family: "Nunito", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
  color: #666;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
