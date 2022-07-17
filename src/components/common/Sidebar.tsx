import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

export function ListItemNavLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderNavLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<NavLinkProps, 'to'>>((itemProps, ref) => {
        return <NavLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem
        component={renderNavLink}
        sx={{ color: 'inherit', '&.active': { color: 'white', backgroundColor: 'success.light' } }}
      >
        {icon ? <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <nav>
        <List sx={{ padding: '16px 0' }}>
          <ListItemNavLink to="/admin/dashboard" primary="Dashboard" icon={<DashboardIcon />} />
          <ListItemNavLink to="/admin/students" primary="Students" icon={<PeopleAltIcon />} />
        </List>
      </nav>
    </Box>
  );
}
