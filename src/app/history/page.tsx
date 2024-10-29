
'use client';

import type { NextPage } from "next";
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip
} from '@mui/material';

interface Operation {
  id: number;
  stationId: number;
  operationType: string;
  fillPercentage: number;
  timestamp: string;
}

const HistoryPage: NextPage = () => {
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      const response = await fetch('/api/operations');
      const data = await response.json();
      setOperations(data);
    } catch (error) {
      console.error('Falha ao buscar operações:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getOperationTypeChip = (type: string) => {
    const color = type === 'collection' ? 'success' : type === 'request' ? 'warning' : 'info';
    const label = type === 'collection' ? 'Coleta' : type === 'request' ? 'Pedido de Coleta' : 'Atualização';
    return <Chip label={label} color={color} size="small" />;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Histórico de Operações
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 600, width: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Estação</TableCell>
              <TableCell align="center">Operação</TableCell>
              <TableCell align="right">Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operations.map((op) => (
              <TableRow key={op.id} hover>
                <TableCell>{formatTimestamp(op.timestamp)}</TableCell>
                <TableCell width={400}>
                  <Box sx={{ display: 'flex', minWidth: 70 }}>
                    Estação {op.stationId}
                  </Box>
                </TableCell>
                <TableCell align="center">{getOperationTypeChip(op.operationType)}</TableCell>
                <TableCell align="right">{op.fillPercentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryPage;
