"use client";

import Link from 'next/link'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const pathname = usePathname();

  return (
    <AppBar position='static'>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Link href="/" className={`link ${pathname === '/' ? 'active font-bold' : ''}`}>
          Estações
        </Link>
        <Link href='/history' className={`link ${pathname === '/history' ? 'active font-bold' : ''}`}>
          Histórico
        </Link>
      </Toolbar>
    </AppBar>
  )
}
