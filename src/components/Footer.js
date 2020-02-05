import React from "react"

const Footer = () => {
  return (
    <footer>
      © {new Date().getFullYear()}, Built by
      {` `}
      <a href="https://ofstad.io">Ofstad.io</a>
    </footer>
  )
}

export default Footer
