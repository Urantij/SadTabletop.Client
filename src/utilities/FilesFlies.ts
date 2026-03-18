export default class FilesFlies {

  public static save(name: string, data: Blob) {

    const element = document.createElement('a');
    element.href = URL.createObjectURL(data);
    element.download = name;
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  }
}
