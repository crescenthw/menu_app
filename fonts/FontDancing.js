import {
  useFonts,
  DancingScript_400Regular,
  DancingScript_500Medium,
  DancingScript_600SemiBold,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
//useFonts와 font 불러오기

export default function FontDancing() {
  //함수 이름은 파일 이름과 같게!
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
}
