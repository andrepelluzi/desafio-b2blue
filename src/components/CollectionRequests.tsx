import { Station } from '@/types/station';
import { List, ListItem, ListItemText, ListItemButton, Button } from '@mui/material';


interface CollectionRequestsProps {
  stations: Station[];
  onConfirmCollection: (station: Station) => void;
}

export const CollectionRequests: React.FC<CollectionRequestsProps> = ({ stations, onConfirmCollection }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      {stations?.map((request) => (
        <ListItem key={request.id} disablePadding divider={stations.indexOf(request) < stations.length - 1}>
          <ListItemButton>
            <ListItemText 
              primary={`${request.name} - Nível de armazenamento: ${request.fillPercentage}%`}
              secondary={`${request.lastCollectionRequest?.toLocaleString('pt-BR')}`}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => onConfirmCollection(request)}
            >
              Confirmar Coleta
            </Button>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};