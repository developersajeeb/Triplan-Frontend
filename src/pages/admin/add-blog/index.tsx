/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SingleImageUploader from '@/components/shared/uploaders/SingleImageUploader';
import BlogEditor from '@/components/shared/blog-editor/BlogEditor';
import { useCreateBlogMutation, useGetCategoriesQuery } from '@/redux/features/blog/blog.api';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['published', 'draft']),
  content: z.string().min(1, 'Content is required'),
});

type BlogFormValues = z.infer<typeof blogSchema>;

const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result ?? ''));
  reader.onerror = () => reject(reader.error ?? new Error('Unable to read image file.'));
  reader.readAsDataURL(file);
});

const AddBlog = () => {
  const navigate = useNavigate();
  const [featureImageFile, setFeatureImageFile] = React.useState<File | null>(null);
  const [featureImagePreview, setFeatureImagePreview] = React.useState<string>('');
  const [showNewCategory, setShowNewCategory] = React.useState(false);
  const [newCategoryInput, setNewCategoryInput] = React.useState('');

  const { data: categoriesResponse } = useGetCategoriesQuery();
  const [createBlog, { isLoading: isSaving }] = useCreateBlogMutation();

  const categories: string[] = categoriesResponse?.data ?? [];

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: '', category: '', status: 'draft', content: '<p></p>' },
  });

  const handleAddNewCategory = (onChange: (val: string) => void) => {
    const trimmed = newCategoryInput.trim();
    if (!trimmed) return;
    onChange(trimmed);
    setNewCategoryInput('');
    setShowNewCategory(false);
  };

  const handleSubmit = async (data: BlogFormValues) => {
    let featureImage = featureImagePreview;
    if (featureImageFile) featureImage = await fileToDataUrl(featureImageFile);

    if (!featureImage) {
      toast.error('Please add a feature image before saving the blog.');
      return;
    }

    const toastId = toast.loading('Saving blog, please wait...');

    try {
      await createBlog({
        title: data.title.trim(),
        category: data.category,
        status: data.status,
        featureImage,
        content: data.content,
      }).unwrap();
      toast.success('Blog created successfully.', { id: toastId });
    }
    catch (error: any) {
      toast.error(error?.data?.message || 'Failed to save blog.', { id: toastId });
      return;
    }

    form.reset({ title: '', category: '', status: 'draft', content: '<p></p>' });
    setFeatureImageFile(null);
    setFeatureImagePreview('');
    navigate('/admin/blogs');
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Add New Blog</h2>
      <p className="text-base font-medium text-gray-600 mb-5">Create a new post with a rich editor and featured image.</p>

      <Form {...form}>
        <form className="space-y-5 mb-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <h3 className="text-lg font-bold text-gray-800">Blog Information</h3>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-600 text-sm">Title<span className="text-destructive text-base">*</span></FormLabel>
                  <FormControl>
                    <Input className="tp-input" placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600 text-sm">
                      Category<span className="text-destructive text-base">*</span>
                    </FormLabel>

                    {showNewCategory ? (
                      <div className="flex items-center gap-2">
                        <Input
                          className="tp-input flex-1"
                          placeholder="Enter new category name"
                          value={newCategoryInput}
                          onChange={(e) => setNewCategoryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') { e.preventDefault(); handleAddNewCategory(field.onChange); }
                            if (e.key === 'Escape') { setShowNewCategory(false); setNewCategoryInput(''); }
                          }}
                          autoFocus
                        />
                        <Button type="button" className="bg-primary-900 hover:bg-primary-700 text-white h-10 px-4 rounded-lg shrink-0" onClick={() => handleAddNewCategory(field.onChange)}>
                          Add
                        </Button>
                        <Button type="button" variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={() => { setShowNewCategory(false); setNewCategoryInput(''); }}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="tp-select flex-1">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.length === 0 && (
                              <div className="px-3 py-2 text-sm text-gray-400">No categories yet</div>
                            )}
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" size="icon" className="h-10 w-10 shrink-0 border-dashed" title="Create new category" onClick={() => setShowNewCategory(true)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    {field.value && !showNewCategory && (
                      <p className="text-xs text-gray-500 mt-1">Selected: <span className="font-medium text-gray-700">{field.value}</span></p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600 text-sm">Status<span className="text-destructive text-base">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="tp-select">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel className="font-semibold text-gray-600 text-sm">Feature Image<span className="text-destructive text-base">*</span></FormLabel>
              <SingleImageUploader onChange={setFeatureImageFile} defaultImageUrl={featureImagePreview || null} />
            </FormItem>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-600 text-sm">Editor<span className="text-destructive text-base">*</span></FormLabel>
                  <FormControl>
                    <BlogEditor value={field.value} onChange={field.onChange} placeholder="Write your blog content here. You can format text, add links, and insert inline images." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button type="button" variant="outline" className="rounded-xl px-6 py-3 h-auto" disabled={isSaving} onClick={() => navigate('/admin/blogs')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="rounded-xl bg-primary-900 hover:bg-primary-700 px-6 py-3 h-auto text-white min-w-[110px]">
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Saving...
                </span>
              ) : 'Save Blog'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddBlog;
