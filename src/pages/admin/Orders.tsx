const AdminOrders = () => {
  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Orders</h1>
      <div className="bg-card border border-border/50 p-12 text-center">
        <p className="font-display text-xl text-muted-foreground mb-2">No orders yet</p>
        <p className="text-sm font-body text-muted-foreground">
          Orders will appear here once customers start purchasing.
        </p>
      </div>
    </div>
  );
};

export default AdminOrders;
