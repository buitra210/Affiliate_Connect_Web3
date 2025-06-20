'use client';

import { List, styled } from '@mui/material';

export const ListWithDisc = styled(List)({
  listStyle: 'disc',
  marginLeft: 24,
  '.MuiListItem-root': {
    display: 'list-item',
  },
});

export const ListWithCircle = styled(List)({
  listStyle: 'circle',
  marginLeft: 16,
  '.MuiListItem-root': {
    display: 'list-item',
  },
});
