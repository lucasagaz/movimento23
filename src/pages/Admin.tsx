import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Admin = () => {
  const [socios, setSocios] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, ativos: 0, pendentes: 0 });

  useEffect(() => {
    // 1. Escuta o banco de dados em tempo real
    const q = query(collection(db, "socios"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista: any[] = [];
      let ativos = 0;
      let pendentes = 0;

      querySnapshot.forEach((doc) => {
        const dados = { id: doc.id, ...doc.data() };
        lista.push(dados);
        if (dados.status === "ativo") ativos++;
        else pendentes++;
      });

      setSocios(lista);
      setStats({ total: lista.length, ativos, pendentes });
    });

    return () => unsubscribe();
  }, []);

  // 2. Função para ativar sócio manualmente
  const ativarSocio = async (id: string) => {
    const socioRef = doc(db, "socios", id);
    await updateDoc(socioRef, { status: "ativo" });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl font-bold uppercase mb-8">Painel de Controle M23</h1>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="blue-glow">
            <CardHeader><CardTitle className="text-sm uppercase">Total de Sócios</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{stats.total}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm uppercase text-secondary">Ativos</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{stats.ativos}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm uppercase text-yellow-500">Pendentes</CardTitle></CardHeader>
            <CardContent><p className="text-4xl font-bold">{stats.pendentes}</p></CardContent>
          </Card>
        </div>

        {/* TABELA DE SÓCIOS */}
        <div className="bg-card rounded-lg border border-primary/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socios.map((socio) => (
                <TableRow key={socio.id}>
                  <TableCell className="font-medium">{socio.nome}</TableCell>
                  <TableCell>{socio.cpf}</TableCell>
                  <TableCell>
                    <Badge variant={socio.status === "ativo" ? "default" : "outline"}>
                      {socio.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {socio.status !== "ativo" && (
                      <Button size="sm" onClick={() => ativarSocio(socio.id)}>
                        Confirmar Pagamento
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Admin;