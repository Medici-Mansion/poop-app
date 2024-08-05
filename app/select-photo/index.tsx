import { router } from "expo-router";
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { ImageEditor } from "expo-image-editor";

import { useGallery } from "@/hooks/use-gallery";
import { useProfileStore } from "@/store/profile";

import PhotoBox from "@/components/select-photo/photo-box";
import BottomLoader from "@/components/select-photo/bottom-loader";

const COLUMN = 3;

const SelectPhotoScreen = () => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

  const profileStore = useProfileStore();
  // const { loadNextPagePictures, photos, hasNextPage, isLoading } = useGallery({
  //   pageSize: 20,
  // });

  const handleSelectImage = (item) => async () => {
    setPhoto(item);
    setEditorVisible(true);
  };

  // const handleEndReached = () => {
  //   if (hasNextPage) loadNextPagePictures();
  // };

  const handleEditComplete = (result) => {
    setPhoto(result);
    profileStore.setAvatar({
      uri: result.uri,
      filename: result.uri.split("/").pop(),
    });
    setTimeout(() => {
      router.back();
      // TODO: 라이브러리 이슈로 300ms 후에 뒤로가기
      // TODO: 라이브러리 대신 자체 구축 형태로 변경하기
    }, 300);
  };

  const renderItem = ({ item }) => (
    <PhotoBox item={item} onPress={handleSelectImage(item)} column={COLUMN} />
  );

  return (
    <View className="flex-1 bg-black h-full">
      <View style={{ flex: COLUMN * COLUMN }}>
        {/* <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${index}`}
          numColumns={COLUMN}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={BottomLoader(isLoading)}
        /> */}
      </View>

      {/* TODO: 이미지 크롭 - 커스텀 용으로 따로 생성할 것 */}
      <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={photo?.uri || ""}
        fixedCropAspectRatio={1 / 1}
        lockAspectRatio={true}
        mode="crop-only"
        minimumCropDimensions={{ width: 100, height: 100 }}
        onEditingComplete={handleEditComplete}
      />
    </View>
  );
};

export default SelectPhotoScreen;
