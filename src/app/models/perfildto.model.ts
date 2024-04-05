export class PerfilDTO {
  public static readonly USER = new PerfilDTO(1, 'User');
  public static readonly ADMIN = new PerfilDTO(2, 'Admin');

  constructor(public id: number, public label: string) {}

  public static valueOf(id: number): PerfilDTO {
    switch (id) {
      case 1:
        return this.USER;
      case 2:
        return this.ADMIN;
      default:
        return this.USER;
    }
  }
}
