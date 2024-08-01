import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card } from 'react-bootstrap';
import './newsCarousel.css'; // Custom CSS for additional styling
import React , {useState,useEffect } from 'react';
const NewsCarousel = () => {


//   const cardData = [
//     { heading: 'Card 1', paragraph: 'This is a description for card 1.', link: 'https://example.com/1' },
//     { heading: 'Card 2', paragraph: 'This is a description for card 2.', link: 'https://example.com/2' },
//     { heading: 'Card 3', paragraph: 'This is a description for card 3.', link: 'https://example.com/3' },
//     { heading: 'Card 4', paragraph: 'This is a description for card 4.', link: 'https://example.com/4' },
//     { heading: 'Card 5', paragraph: 'This is a description for card 5.', link: 'https://example.com/5' },
//     { heading: 'Card 6', paragraph: 'This is a description for card 6.', link: 'https://example.com/6' },
//     { heading: 'Card 7', paragraph: 'This is a description for card 7.', link: 'https://example.com/7' },
//     { heading: 'Card 1', paragraph: 'This is a description for card 1.', link: 'https://example.com/1' },
//     { heading: 'Card 2', paragraph: 'This is a description for card 2.', link: 'https://example.com/2' },
//     { heading: 'Card 3', paragraph: 'This is a description for card 3.', link: 'https://example.com/3' },
//     { heading: 'Card 4', paragraph: 'This is a description for card 4.', link: 'https://example.com/4' },
//     { heading: 'Card 5', paragraph: 'This is a description for card 5.', link: 'https://example.com/5' },
//     { heading: 'Card 6', paragraph: 'This is a description for card 6.', link: 'https://example.com/6' },
//     { heading: 'Card 7', paragraph: 'This is a description for card 7.', link: 'https://example.com/7' },
//   ];

  const [cardData, setcardData] = useState([]);
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };


  useEffect(() => {
        
  
 
    fetch(BACKEND_URL + '/get_news', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            withCredentials: true
        },


    })

        .then(async (response) => {
            const data = await response.json();
            if (data.success && data.data && data.data.status === 'SUCCESS') {
                console.log(data.data.data)
                setcardData(data.data.data);


            } else {
                navigate("/");

            }
        })
        .catch((error) => {
            navigate("/");

        });
  
   

}, []);


  return (
    <div className="carousel-container">
      <Carousel responsive={responsive} infinite={true} autoPlay={true} arrows={false} autoPlaySpeed={3000}>
        {cardData.map((card, index) => (
          <a key={index} href={card.link} target="_blank" rel="noopener noreferrer" className="carousel-card-link">
            <Card className="carousel-card">
              <Card.Body>
                <Card.Title style={{fontSize:"13px",fontWeight:"bold"}}>{card.heading}</Card.Title>
                <Card.Text style={{fontSize:"10px"}}>{card.paragraph}</Card.Text>
              </Card.Body>
            </Card>
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
