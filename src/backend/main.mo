import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Data Models
  type Price = {
    amount : Float;
    currency : Text;
  };

  type Product = {
    id : Text;
    title : Text;
    sourceUrl : Text;
    price : Price;
    rawPayload : Text;
  };

  type Service = {
    id : Text;
    title : Text;
    sourceUrl : Text;
    price : Price;
    rawPayload : Text;
  };

  type OrderItem = {
    itemId : Text;
    quantity : Nat;
    price : Price;
  };

  type Order = {
    clientId : Text;
    items : [OrderItem];
    total : Price;
  };

  // Sample Data (would be replaced by real scraping in future stages)
  let products = List.fromArray<Product>([
    { id = "p1"; title = "Product 1"; sourceUrl = "https://shop1.caffeine.xyz"; price = { amount = 299.99; currency = "USD" }; rawPayload = "..." },
    { id = "p2"; title = "Product 2"; sourceUrl = "https://shop2.caffeine.xyz"; price = { amount = 49.50; currency = "EUR" }; rawPayload = "..." },
    { id = "p3"; title = "Product 3"; sourceUrl = "https://shop1.caffeine.xyz"; price = { amount = 129.95; currency = "USD" }; rawPayload = "..." },
    { id = "p4"; title = "Product 4"; sourceUrl = "https://shop3.caffeine.xyz"; price = { amount = 99.99; currency = "USD" }; rawPayload = "..." },
    { id = "p5"; title = "Product 5"; sourceUrl = "https://shop2.caffeine.xyz"; price = { amount = 75.00; currency = "EUR" }; rawPayload = "..." },
  ]);

  let services = List.fromArray<Service>([
    { id = "s1"; title = "Service 1"; sourceUrl = "https://services.caffeine.xyz"; price = { amount = 79.99; currency = "USD" }; rawPayload = "..." },
    { id = "s2"; title = "Service 2"; sourceUrl = "https://consulting.caffeine.xyz"; price = { amount = 150.00; currency = "USD" }; rawPayload = "..." },
    { id = "s3"; title = "Service 3"; sourceUrl = "https://design.caffeine.xyz"; price = { amount = 99.95; currency = "EUR" }; rawPayload = "..." },
    { id = "s4"; title = "Service 4"; sourceUrl = "https://marketing.caffeine.xyz"; price = { amount = 59.99; currency = "USD" }; rawPayload = "..." },
    { id = "s5"; title = "Service 5"; sourceUrl = "https://support.caffeine.xyz"; price = { amount = 49.99; currency = "USD" }; rawPayload = "..." },
  ]);

  let orders = Map.empty<Text, Order>();

  // Comparison functions for sorting Price and Products
  module Price {
    public func compareByAmount(p1 : Price, p2 : Price) : Order.Order {
      Float.compare(p1.amount, p2.amount);
    };
  };

  module Product {
    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      Price.compareByAmount(p1.price, p2.price);
    };
  };

  // Scraper Functions (mocked)
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.toArray();
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.toArray();
  };

  public query ({ caller }) func getProductsByMinPrice(minPrice : Float) : async [Product] {
    products.toArray().filter(
      func(product) { product.price.amount >= minPrice }
    );
  };

  public query ({ caller }) func getProductsSortedByPrice() : async [Product] {
    products.toArray().sort(Product.compareByPrice);
  };

  public query ({ caller }) func getProductsBySource(sourceUrl : Text) : async [Product] {
    products.toArray().filter(
      func(product) { product.sourceUrl == sourceUrl }
    );
  };

  public query ({ caller }) func getProductsByCurrency(currency : Text) : async [Product] {
    products.toArray().filter(
      func(product) { product.price.currency == currency }
    );
  };

  // Order Management
  public shared ({ caller }) func createOrder(order : Order) : async Text {
    let orderId = "order-" # order.clientId # "-" # order.items.size().toText();
    orders.add(orderId, order);
    orderId;
  };

  public query ({ caller }) func getOrder(id : Text) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getOrdersByClient(clientId : Text) : async [Order] {
    let ordersArray = orders.values().toArray();
    let filteredOrders = ordersArray.filter(
      func(order) { order.clientId == clientId }
    );
    filteredOrders;
  };

  public shared ({ caller }) func updateOrder(id : Text, updatedOrder : Order) : async () {
    if (orders.containsKey(id)) {
      orders.add(id, updatedOrder);
    } else {
      Runtime.trap("Order not found");
    };
  };

  public shared ({ caller }) func deleteOrder(id : Text) : async () {
    if (orders.containsKey(id)) {
      orders.remove(id);
    } else {
      Runtime.trap("Order not found");
    };
  };

  // Contact Page
  public shared ({ caller }) func getContactInfo() : async (Text, Text) {
    // Return contact information and iframe URL for e-contract-lwf.caffeine.xyz
    ("For business inquiries, contact support@caffeine.xyz. For jobs and employment, visit careers.caffeine.xyz or email jobs@caffeine.xyz. For press, email press@caffeine.xyz or press@dscvr.one. For partnerships and platform integrations, contact admin@caffeine.xyz", "https://e-contract-lwf.caffeine.xyz");
  };

  // Sitemap Generation
  public shared ({ caller }) func getSitemap() : async [(Text, Nat, Text)] {
    [
      ("/account", 1, "Owner"),
      ("/admins", 1, "Owner"),
      ("/arbitrages", 1, "Owner"),
      ("/dashboard", 1, "Owner"),
      ("/orders", 1, "Owner"),
      ("/products", 1, "Owner"),
      ("/register", 1, "Owner"),
      ("/services", 1, "Owner"),
      ("/test", 1, "Owner"),
      ("/orders", 2, "Admin"),
      ("/products", 2, "Admin"),
      ("/dashboard", 2, "Admin"),
      ("/services", 2, "Admin"),
      ("/register", 2, "Admin"),
      ("/dashboard", 3, "Client"),
      ("/external", 3, "Client"),
      ("/user", 3, "Client"),
      ("/orders", 4, "Global"),
      ("/products", 4, "Global"),
      ("/services", 4, "Global"),
      ("/", 5, "Global"),
      ("/blank", 5, "Global"),
      ("/contact", 5, "Global"),
      ("/external", 5, "Global"),
      ("/user", 5, "Global"),
    ];
  };

  // QRC Onboarding (stub)
  public shared ({ caller }) func generateClientId(mobile10 : Text, unixTimestamp : Text) : async Text {
    let clientId = mobile10 # "-" # unixTimestamp;
    clientId;
  };

  public query ({ caller }) func getArbitrages() : async [(Text, Price, Text, Price)] {
    [
      ("Product 1", { amount = 299.99; currency = "USD" }, "Platform 1", { amount = 150.00; currency = "USD" }),
      ("Service 2", { amount = 49.50; currency = "EUR" }, "Platform 3", { amount = 99.95; currency = "EUR" }),
      ("Product 3", { amount = 129.95; currency = "USD" }, "Platform 2", { amount = 79.99; currency = "USD" }),
    ];
  };

  public shared ({ caller }) func setArbitrage(_sourcePlatform : Text, _arbitrage1 : (Text, Price, Text, Price), _arbitrage2 : (Text, Price, Text, Price)) : async Nat {
    0;
  };

  // Echo Text Function
  public shared ({ caller }) func echoText(text : Text) : async Text {
    text;
  };
};
