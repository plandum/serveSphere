
import ProductForm from "@/components/forms/ProductForm.tsx";

const CreateProduct = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Product</h2>
        </div>

        <ProductForm action="Create" />
      </div>
    </div>
  );
};

export default CreateProduct;
