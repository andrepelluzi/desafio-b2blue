import React, { useState } from 'react'
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
  onClose: () => void
  onUpdateFill: (fillPercentage: number) => void
}

export const UpdateFillPercentageModal: React.FC<
  UpdateFillPercentageModalProps
> = ({ open, stationName, onClose, onUpdateFill }) => {
  const [fillPercentage, setFillPercentage] = useState(50)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setFillPercentage(newValue as number)
  }

  const handleSave = () => {
    onUpdateFill(fillPercentage)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{stationName}</DialogTitle>
      <DialogContent>
        <Typography>
          Ajuste o níviel de volume de armazenamento
        </Typography>
        <Slider
          value={fillPercentage}
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
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}
