
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
import { historyMock } from "./mock";

interface Operation {
  id: number;
  station_id: number;
  operation_type: string;
  fill_percentage: number;
  timestamp: string;
}

const HistoryPage: NextPage = () => {
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchOperations = async () => {
    try {
      const data = historyMock as Operation[];
      setOperations(data);
    } catch (error) {
      console.error('Failed to fetch operations:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const getOperationTypeChip = (type: string) => {
    const color = type === 'collection' ? 'success' : 'primary';
    const label = type === 'collection' ? 'Coleta' : 'Atualização de Volume';
    return <Chip label={label} color={color} size="small" />;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Operations History
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
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
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Estação {op.station_id}
                  </Box>
                </TableCell>
                <TableCell align="center">{getOperationTypeChip(op.operation_type)}</TableCell>
                <TableCell align="right">{op.fill_percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryPage;