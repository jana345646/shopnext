//dynamic route: by it we create only one page and it's content differs according to the different id's that will be sent to it.
// it's structure : inside app create folder named products (main part in url or base url) inside it we create new folder named [id] (square brackets to tell next that this page is a dynamic route and it's content will change according to the id) then inside it create page.tsx (the main page that will be displayed)

import ProductProvider from "@/context/ProductProvider"; // we call the provider here as this page only will need it not the all pages due to that we didn't define it in the layout
import ProductDetail from "@/components/ProductDetail";

interface PageProps {
  params: Promise<{ id: string }>; // params is ana abbreviation for "route parameters" next send it automativally so this name and id name is static , and it is a string because anything comes from the url is a string , promise as params is treated as an async so it will take time to be retrived so due to that we added proimse and to can use await
}

export default async function Product({ params }: PageProps) {
  const { id } = await params;

  return (
    <ProductProvider id={id}>
      <ProductDetail />
    </ProductProvider>
  );
}
