import React from 'react'

const Footer = () => {

  return (
    <>
    <footer className="border-t border-border/50 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              DevBlog - Built with Next.js and Sanity CMS
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                GitHub
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                RSS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer