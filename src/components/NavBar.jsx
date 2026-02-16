import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar(){
  //CHECK IF THE MENU IS OPEN OR CLOSED. FALSE IS CLOSED, TRUE IS OPEN
    const [isOpen, setIsOpen] = useState(false);
    // Get the current user and logout function from AuthContext
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
      try {
        await logout();
        window.location.href = '/'; // Redirect to home after logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    //JAVASCRIPT OBJECT TO STORE MY CSS STYLES
    const styles = {
      nav: {
        backgroundColor: 'rgb(253, 253, 255)',
        padding : '10px 20px',
        position : 'sticky', //navbar sticks to view point when scrolling
        top : 0,
        zIndex : 1000, //ensures navbar is on top of other elements
        boxShadow : '0 2px 4px rgba(0,0,0,0.1)', //adds a subtle shadow below the navbar
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

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
        gap : '20px',
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
        color: '#4a5568',
        textDecoration : 'none',
        fontSize : '15px',
        fontWeight: '500',
        transition : 'color 0.3s ease', //color change over 0.3 seconds
        padding : '8px 12px'
      },
      //hover effect for links
      linkHover: {
        color: '#8e96d6ff'
      },
      // Style for the logout button in the navbar
      authBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'opacity 0.2s'
      },
      // Style for the login link in the navbar
      loginLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '8px 20px',
        borderRadius: '8px',
        transition: 'opacity 0.2s'
      }
};

//media query to check if the screen width is 900px or less
const mediaQuery = window.matchMedia('(max-width: 900px)');
//if mobile screen TRUE, FALSE if desktop
const isMobile = mediaQuery.matches;
//modify to show hamburger menu button and hide desktop nav links
if(isMobile){
  styles.menuButton.display = 'block';
  styles.navLinks.display = 'none';
}

// Build nav items dynamically based on whether user is logged in
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Progress', href: '/dashboard' },
  { name: 'Talk', href: '/talkspace' },
  { name: 'Journal', href: '/journal' },
  { name: 'Therapists', href: '/therapists' },
  { name: 'Affirmations', href: '/affirmation' },
];

    return(
        <nav style={styles.nav}>
          <div style={styles.container}>
            <Link to="/" style={styles.logo}>TalktoMe</Link>

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
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.href}
                   style={styles.link}
                   onMouseOver={(e) => e.currentTarget.style.color = '#60a5fa' }
                   onMouseOut={(e) => e.currentTarget.style.color = '#667eea' }
                   >{item.name }</Link>
                </li>
              ))}
              {/* Show user greeting + logout, or login link */}
              <li>
                {currentUser ? (
                  <button onClick={handleLogout} style={styles.authBtn}>
                    <LogOut size={16} />
                    {currentUser.displayName || 'Logout'}
                  </button>
                ) : (
                  <Link to="/authpage" style={styles.loginLink}>Login</Link>
                )}
              </li>
            </ul>
            {/* Mobile dropdown menu */}
            {isOpen && isMobile && (
              <ul style={styles.navLinksMobile}>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href}
                     style={styles.link}
                    onClick={ () => setIsOpen(false)}
                     >{item.name}</Link>
                  </li>
                ))}
                <li>
                  {currentUser ? (
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} style={styles.authBtn}>
                      <LogOut size={16} />
                      {currentUser.displayName || 'Logout'}
                    </button>
                  ) : (
                    <Link to="/authpage" style={styles.link} onClick={() => setIsOpen(false)}>Login</Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </nav>
    );
  }
