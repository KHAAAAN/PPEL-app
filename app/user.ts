export class User{
	public id: string;
	public ts: string;

	public permissions = {
		superUser: null as boolean,
		normalUser:	null as boolean		
	}	
}
