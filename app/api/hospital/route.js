import clientPromise from "@/utils/mongodb";

export async function GET(request) {
        const client = await clientPromise;
        const db = client.db('hospitalsRegional');
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('q')
        const hospitals = await db.collection('hospitals').find({
            $or : [
                {'Identifiers.Facility Name' : { $regex: query, $options: 'i' }},
                {'Location.Ward' : { $regex: query, $options: 'i' }},
                {'Location.LGA' : { $regex: query, $options: 'i' }},
            ]
        }).limit(30).toArray()
        return Response.json(hospitals)
}