import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Typography,
} from '@mui/material'

interface UpdateFillPercentageModalProps {
  open: boolean
  stationName: string
  fillPercentage: number;
  onClose: () => void
  onUpdateFill: (newFillPercentage: number) => void
}

export const UpdateFillPercentageModal: React.FC<
  UpdateFillPercentageModalProps
> = ({ open, stationName, fillPercentage, onClose, onUpdateFill }) => {
  const [newFillPercentage, setNewFillPercentage] = useState(fillPercentage);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (newValue as number >= fillPercentage) {
      setNewFillPercentage(newValue as number);
    }
  }

  const handleSave = () => {
    onUpdateFill(newFillPercentage)
    onClose()
  }

  useEffect(() => {
    setNewFillPercentage(fillPercentage);
  }, [fillPercentage]);

  const handleCancel = () => {
    setNewFillPercentage(fillPercentage); // Reseta o newFillPercentage para o fillPercentage atual
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{stationName}</DialogTitle>
      <DialogContent>
        <Typography>
          Ajuste o níviel de volume de armazenamento
        </Typography>
        <Slider
          value={newFillPercentage}
          onChange={handleSliderChange}
          aria-label={`${stationName} volume`}
          valueLabelDisplay='on'
          valueLabelFormat={(value) => `${value}%`}
          step={1}
          min={0}
          max={100}
          sx={{ mt: 5 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}
