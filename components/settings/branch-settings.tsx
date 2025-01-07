"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const mockBranches = [
  { 
    id: 1, 
    name: 'Merkez Şube', 
    branchId: 'BR001', 
    lastUpdated: '2024-03-15',
    template: 'Standart Menü',
    priceList: 'Standart Fiyat Listesi'
  },
  { 
    id: 2, 
    name: 'AVM Şubesi', 
    branchId: 'BR002', 
    lastUpdated: '2024-03-14',
    template: 'Yaz Menüsü',
    priceList: 'İndirimli Fiyat Listesi'
  },
  { 
    id: 3, 
    name: 'Sahil Şubesi', 
    branchId: 'BR003', 
    lastUpdated: '2024-03-13',
    template: 'Kış Menüsü',
    priceList: 'Özel Müşteri Fiyat Listesi'
  },
];

export function BranchSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBranches = mockBranches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.branchId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Şubeler</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Şube
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Şube ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Şube Adı</TableHead>
                <TableHead>Şube ID</TableHead>
                <TableHead>Son Güncelleme</TableHead>
                <TableHead>Şablon Adı</TableHead>
                <TableHead>Fiyat Listesi</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBranches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.branchId}</TableCell>
                  <TableCell>{new Date(branch.lastUpdated).toLocaleDateString('tr-TR')}</TableCell>
                  <TableCell>{branch.template}</TableCell>
                  <TableCell>{branch.priceList}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}