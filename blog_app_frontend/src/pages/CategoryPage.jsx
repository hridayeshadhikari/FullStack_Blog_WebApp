import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import PostCard from '../components/postCard/PostCard';
import { getLatestPost, getPostByCategory, getRandomPosts } from '../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { latestPost, posts } = useSelector((state) => state.post);
  const [category, setCategory] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('name', selectedCategory);
    navigate({ search: `?${searchParams.toString()}` });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryCategory = searchParams.get('name');
    if (queryCategory) {
      setCategory(queryCategory);
    } else {
      setCategory(''); 
    }
  }, [location.search]);

  useEffect(() => {
    dispatch(getLatestPost());

    if (category) {
      dispatch(getPostByCategory(category));
    } else {
      dispatch(getRandomPosts());
    }
  }, [dispatch, category]);

  const decodeQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodeQueryString);
  const pageNumber = searchParams.get('page') || 1;

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

 
  const postList = category ? posts?.content : posts || [];

  return (
    <>
      <div className='max-w-screen bg-gray-200'>
        <div className='max-w-[350px] md:max-w-[1130px] mx-auto'>
          <h1 className='font-semibold text-3xl py-4'>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-standard-label">
                <h1 className=' text-xl'>Category</h1>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="lifestyle">Lifestyle</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="Health and Fitness">Health and Fitness</MenuItem>
                <MenuItem value="Food and Drink">Food and Drink</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Beauty">Beauty</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
                <MenuItem value="Art and Culture">Art and Culture</MenuItem>
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
              </Select>
            </FormControl>
          </h1>
        </div>
      </div>
      <div className='max-w-[350px] md:max-w-[1130px] mx-auto'>
        <div className='grid md:grid-cols-[75%_25%] grid-cols-1 gap-6 '>
          <div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 my-5 '>
             
              {Array.isArray(postList) &&
                postList.map((item) => <PostCard key={item.name} post={item} />)}
            </div>
            {category && (
              <div className='flex justify-center py-10'>
                <Stack spacing={2}>
                  <Pagination
                    count={posts?.totalPages || 1}
                    onChange={handlePaginationChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            )}
          </div>

          <div className='my-5'>
            <Sidebar latestPost={latestPost} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
