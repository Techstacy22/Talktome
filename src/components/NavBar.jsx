import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar(){
  //CHECK IF THE MENU IS OPEN OR CLOSED. FALSE IS CLOSED, TRUE IS OPEN
    const [isOpen, setIsOpen] = useState(false);

    //JAVASCRIPT OBJECT TO STORE MY CSS STYLES
    const styles = {
      nav: {
        backgroundColor: 'rgb(253, 253, 255)',
        padding : '10px 20px',
        position : 'sticky', //navbar sticks to view point when scrolling 
        top : 0,
        zIndex : 1000, //ensures navbar is on top of other elements
        boxShadow : '0 2px 4px rgba(0,0,0,0.1)' //adds a subtle shadow below the navbar
        
      },
      //container that holds Nav Content 
      container: {
        maxWidth : '1200px',
        margin : '0 auto',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center'
      },
      //logo styles
      logo: {
        color: '#171718',
        fontSize : '24px',
        fontWeight : 'bold',
        textDecoration : 'none'//removes the underline from the link

      },
      //menubutton styles
      menuButton: {
        display : 'none', //hidden by default shows on mobile though
        background : 'none',
        border : 'none',
         color: '#667eea',
        cursor : 'pointer',
        padding : '8px'
      },
      //navLinks styles
      navLinks: {
        display : 'flex',//arranges links in a row
        gap : '32px',
        listStyle : 'none', //removes default bullet points from list
        margin : 0,
        padding : 0,
      },
      //dropdown menu styles for mobile view
      navLinksMobile: {
        display : 'flex',
        flexDirection : 'column', //stacks links vertically instaed of horisontally
        gap : '16px',
        listStyle : 'none',
        margin : 0,
        padding : '16px 0',
       backgroundColor : 'rgb(244, 242, 242)',
        position : 'absolute',//positions the dropdown relative to the nearest positioned nav element
        top: '100%', //positions the dropdown directly below the navbar
        left : 0,
        right : 0,
        zIndex : 1001, //ensures dropdown is above other elements
        boxShadow : '0 2px 4px rgba(0,0,0,0.1)' //adds a subtle shadow below the dropdown
      },
      //style for each link
      link: {
        color: '#0e0e0f',
        textDecoration : 'none',
        fontSize : '18px',
        transition : 'color 0.3s ease', //color change over 0.3 seconds
        padding : '8px 16px'
      },
      //hover effect for links
      linkHover: {
        color: '#8e96d6ff'
      }
};

//media query to check if the screen width is 768px or less
const mediaQuery = window.matchMedia('(max-width: 768px)');
//if mobile screen TRUE, FALSE if desktop
const isMobile = mediaQuery.matches;  
//modify to show hamburger menu button and hide desktop nav links 
if(isMobile){
  styles.menuButton.display = 'block';
  styles.navLinks.display = 'none';
}

const navItems = [
  { name: 'Home',  href: '/' },
  { name: 'Afffimations', href: '/Affirmation' },
  { name: 'TalkSpace', href: '/TalkSpace' },
  { name: 'SignUp/Login', href: '/AuthPage' },
];

    return(
        <nav style={styles.nav}>
          <div style={styles.container}>
            <a href="/" style={styles.logo}>TalktoMe</a>
            
{/* Hamburger menu button */}
            <button 
              style={styles.menuButton}
              onClick={() => setIsOpen(!isOpen)}//changes state when clivked on 
              aria-label="Toggle menu"
            >
              {/* if state is true show X icon, otherwise show menun icon  */}
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          
            <ul style={isMobile ? { display: 'none' } : styles.navLinks}>
              {/* //looping through navItems array using a map, cfeating a link for each item   */}
              {navItems.map((item) => (
                //listing items with a special key to help react identify them uniquely 
                <li key={item.name}>
                  <a href={item.href}
                   style={styles.link}
                   onMouseOver={(e) => e.currentTarget.style.color = '#60a5fa' }
                   onMouseOut={(e) => e.currentTarget.style.color = '#667eea' }
                   >{item.name }</a>
                </li>
              ))}
            </ul>
            {/* Mobile dropdown menu */}
            {/* render if both isOpen is true and isMobile is true */}
            {isOpen && isMobile && (
              <ul style={styles.navLinksMobile}>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.href}
                     style={styles.link}
                    onClick={ () => setIsOpen(false)}// mobile menu closes when link is clicked
                     >{item.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
    );
  }