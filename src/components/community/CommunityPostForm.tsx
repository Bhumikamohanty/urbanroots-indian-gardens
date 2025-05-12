
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Image, Send, X } from 'lucide-react';
import { CommunityPostType } from './CommunityFeed';

interface CommunityPostFormProps {
  onPostSubmit: (post: CommunityPostType) => void;
  userName: string;
}

const regions = [
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'Others'
];

const tags = [
  'Herbs',
  'Vegetables',
  'Fruits',
  'Flowers',
  'Balcony Setup',
  'Vertical Garden',
  'Troubleshooting',
  'Success Story',
  'Question'
];

const CommunityPostForm: React.FC<CommunityPostFormProps> = ({ onPostSubmit, userName }) => {
  const [content, setContent] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [region, setRegion] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      
      // Check if adding these would exceed the limit
      if (images.length + selectedFiles.length > 4) {
        toast.error("Maximum 4 images allowed");
        return;
      }
      
      // Check file size for each (5MB limit)
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast.error("Some images exceed the 5MB limit");
        return;
      }
      
      setImages(prev => [...prev, ...selectedFiles]);
      
      // Generate previews
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    
    // Clean up URL object to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Please write something to share");
      return;
    }
    
    setUploading(true);
    
    try {
      // Normally we would upload images to a server here
      // For now we'll just use the local preview URLs
      
      const newPost: CommunityPostType = {
        id: Date.now().toString(),
        userId: 'current-user-id',
        userName: userName || 'Anonymous User',
        userImage: undefined, // Would come from user profile
        content,
        images: imagePreviews.length > 0 ? imagePreviews : undefined,
        likes: 0,
        comments: 0,
        createdAt: new Date(),
        region: region || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined
      };
      
      // Artificial delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onPostSubmit(newPost);
      setContent('');
      setSelectedTags([]);
      setRegion('');
      setImages([]);
      setImagePreviews([]);
      
      toast.success("Post shared successfully!");
      
    } catch (error) {
      toast.error("Failed to share post. Please try again.");
      console.error("Post share error:", error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content">Share your garden experience</Label>
        <Textarea
          id="content"
          placeholder="Share tips, ask questions, or showcase your garden..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-y"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="flex justify-between">
          <span>Add photos (max 4)</span>
          <span className="text-gray-500 text-sm">{images.length}/4</span>
        </Label>
        
        {imagePreviews.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img 
                  src={preview} 
                  alt={`Upload ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {images.length < 4 && (
              <div 
                className="border border-dashed border-gray-300 rounded-md flex items-center justify-center h-32 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => document.getElementById('post-image-upload')?.click()}
              >
                <div className="text-center">
                  <Image className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-xs text-gray-500 mt-1">Add photo</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div 
            className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('post-image-upload')?.click()}
          >
            <Image className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">Click to upload photos</p>
            <p className="text-xs text-gray-500">JPG, PNG or WEBP (max 5MB each)</p>
          </div>
        )}
        
        <input
          id="post-image-upload"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          onChange={handleImageUpload}
          multiple
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="region">Your Region (optional)</Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger>
            <SelectValue placeholder="Select your region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Tags (optional)</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Button
              key={tag}
              type="button"
              size="sm"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={selectedTags.includes(tag) ? "bg-ur-green hover:bg-ur-green/90 text-white" : ""}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-ur-green hover:bg-ur-green/90 text-white"
        disabled={uploading || !content.trim()}
      >
        {uploading ? 'Sharing...' : (
          <>
            <Send className="mr-2 h-4 w-4" /> 
            Share Post
          </>
        )}
      </Button>
    </form>
  );
};

export default CommunityPostForm;
