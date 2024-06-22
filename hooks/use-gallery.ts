import { useCallback, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { getImageUri } from '@/utils/image';

interface GalleryOptions {
  pageSize?: number;
  mimeTypeFilter?: Array<string>;
}

interface GalleryLogic {
  photos?: MediaLibrary.Asset[];
  loadNextPagePictures: () => void;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  hasNextPage: boolean;
}

export const useGallery = ({ pageSize = 30 }: GalleryOptions): GalleryLogic => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>();

  const loadNextPagePictures = useCallback(async () => {
    if (isLoading || isLoadingNextPage) return;
    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);

      const media = await MediaLibrary.getAssetsAsync({
        first: pageSize,
        after: nextCursor,
        mediaType: ['photo'],
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });

      const formattedAssets = await Promise.all(
        media.assets.map(async asset => {
          const uri = await getImageUri(asset.uri);
          return { ...asset, uri };
        }),
      );
      setPhotos(prev => [...(prev ?? []), ...formattedAssets]);
      setNextCursor(media.endCursor);
      setHasNextPage(media.hasNextPage);
    } catch (error) {
      console.error('useGallery getPhotos error:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingNextPage(false);
    }
  }, [isLoading, isLoadingNextPage, nextCursor, pageSize]);

  const getPermissions = async () => {
    const {
        status,
        canAskAgain,
    } = await MediaLibrary.getPermissionsAsync();

    if (status === "undetermined" && canAskAgain) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "undetermined") loadNextPagePictures();
    } else if (status !== "undetermined") loadNextPagePictures();
};

  useEffect(() => {
    getPermissions();
  }, []);

  return {
    photos,
    loadNextPagePictures,
    isLoading,
    isLoadingNextPage,
    hasNextPage,
  };
};
