import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";
import { ProductValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { FileUploader, Loader } from "@/components/shared";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import { INewProduct } from "@/types";

type ProductFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const ProductForm = ({ post, action }: ProductFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),
    defaultValues: {
      productName: post ? post?.productName : "",
      productPrice: post ? post?.productPrice : "",
      productDescription: post ? post?.productDescription : "",
      productFile: [],
      productCategory:post ? post?.productCategory : "",
      location: post ? post.location : "",
    },
  });

  // Query
  const { mutateAsync: createProduct, isLoading: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updateProduct, isLoading: isLoadingUpdate } =
    useUpdatePost();

  // Handler
  const handleSubmit = async (value: z.infer<typeof ProductValidation>) => {
    // ACTION = UPDATE
    //console.log("SUBMITTING DATA:", value);
    if (post && action === "Update") {
      const updatedProduct = await updateProduct({
        ...value,
        productId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedProduct) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/products/${post.$id}`);
    }

    // ACTION = CREATE
    const newProduct = await createProduct({
      ...(value as INewProduct),
      userId: user.id,
    });

    if (!newProduct) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    }
    navigate("/");
  };

  return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full max-w-3xl">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Левая колонка: фото и превью */}
        <div className="flex flex-col items-start gap-4">
          <FormField
            control={form.control}
            name="productFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Photos</FormLabel>
                <FormControl>
                  <div className="w-full max-w-sm rounded-xl border border-gray-200 overflow-hidden relative">
                    <FileUploader
                      fieldChange={(files) => {
                        field.onChange(files);
                      }}
                      mediaUrl={post?.imageUrl}
                    />
                  </div>
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          {/* Превью других фото, если есть */}
          {form.watch("productFile")?.length > 1 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {form.watch("productFile").slice(1).map((file: File, index: number) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-20 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Правая колонка: всё остальное */}
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Product Name</FormLabel>
                <FormControl>
                  <Input className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <Input type="number" min="0" step="1" className="shad-input pl-7" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Add Description ..." className="shad-text" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Select Product Category</FormLabel>
                <FormControl>
                  <Textarea placeholder="Select Product Category" className="shad-text" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Add Location</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-center justify-end">
            <Button
              type="button"
              className="shad-button_dark_4"
              onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              disabled={isLoadingCreate || isLoadingUpdate}>
              {(isLoadingCreate || isLoadingUpdate) && <Loader />}
              {action} Product
            </Button>
          </div>
        </div>
      </div>
    </form>
  </Form>
)
};

export default ProductForm;
