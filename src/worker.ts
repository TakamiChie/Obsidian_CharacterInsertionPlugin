/**
 * 実際に文字列を処理する。
 * もし文字列の先頭にキャラクタリストの文字列があった場合は、次の文字列に文字を置換える。
 * 文字列の先頭にキャラクタがない場合はキャラクタリストの先頭の文字列を追加した値を返す。
 * @param astring 処理対象となる文字列
 * @param characterList キャラクタリスト
 * @returns 処理済みの文字列
 */
export function switchChar(astring: string, characterList: Array<string>){
  let ret: string = astring;
  if(characterList.length > 0){
    const index: number = characterList.findIndex(c => astring.startsWith(c));
    if(index == -1){
      ret = `${characterList[0]}${astring}`;
    }else{
      const next: string = characterList[(index + 1) % characterList.length];
      ret = `${next}${astring.slice(next.length)}`;
    }
  }
  return ret;
}
