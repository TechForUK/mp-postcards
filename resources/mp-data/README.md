# MP lookup data

Data used by the MP lookup service is a combination of MP and constituency data from http://www.data.parliament.uk/ along with contact data from https://everypolitician.org/

- https://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons%7CIsEligible=true
- https://data.parliament.uk/membersdataplatform/services/mnis/ReferenceData/Constituencies/
- https://cdn.rawgit.com/everypolitician/everypolitician-data/f73b3431b912753b70fe5ab6c7aa305ffda5938b/data/UK/Commons/term-57.csv

## Prepare MP data

```
curl -L -X GET \
  'https://data.parliament.uk/membersdataplatform/services/mnis/members/query/house=Commons|IsEligible=true' \
  -H 'Accept: application/json' \
  -H 'cache-control: no-cache' \
  -o mp-data.json
```

```
jq '[.Members.Member[] | {member_id: .["@Member_Id"], sort_name: .ListAs, member_name: .DisplayAs, full_title: .FullTitle, party_id: .Party["@Id"], party_name: .Party["#text"], constituency_name: .MemberFrom}]' < mp-data.json > mp-data-filtered.json
```

## Prepare constituency data

```
curl -L -X GET \
  'https://data.parliament.uk/membersdataplatform/services/mnis/ReferenceData/Constituencies/' \
  -H 'Accept: application/json' \
  -H 'cache-control: no-cache' \
  -o constituency-data.json
```

```
jq '[.Constituencies.Constituency[] | select(.ONSCode != null) | {consituency_id: .Constituency_Id, constituency_name: .Name, constituency_onscode: .ONSCode}]' < constituency-data.json > constituency-data-filtered.json
```

## Prepare contact details

Requires `npm install d3-dsv`

```
curl -L -X GET \
  'https://cdn.rawgit.com/everypolitician/everypolitician-data/f73b3431b912753b70fe5ab6c7aa305ffda5938b/data/UK/Commons/term-57.csv' \
  -H 'Accept: text/plain' \
  -H 'cache-control: no-cache' \
  -o contact-data.csv
```

```
./node_modules/.bin/dsv2json contact-data.csv | jq '[.[] | select(.end_date | length == 0) | {sort_name: .sort_name, member_email: .email, member_twitter: .twitter, member_facebook: .facebook}]' > contact-data-filtered.json
```

## Combine data

```
jq -s '[ .[0] + .[1] | group_by(.constituency_name)[] | select(length > 1) | add ]' mp-data-filtered.json constituency-data-filtered.json > constituency-data-combined.json
```

```
jq -s '[ .[0] + .[1] | group_by(.sort_name)[] | select(length > 1) | add ]' constituency-data-combined.json contact-data-filtered.json > mp-lookup-data.json
```

## Validation

Combining data based on the name is not great but I've not found a way to match up the IDs available from different sources yet, so the final step is manually fixing up the mismatches!

```
jq -s '[ .[0] + .[1] | group_by(.sort_name)[] | select(length < 2) | add ]' constituency-data-combined.json contact-data-filtered.json > mismatched-data.json
```

Will show what went wrong. Just fix up the offending sortnames in the contact-data-filtered.json file by hand and rerun the final combine data step. After everything has been merged successfully, check that there are 650 MPs.

```
jq 'length' < mp-lookup-data.json
```

The following command will show which MPs do not have email addresses.

```
jq '.[] | select(.member_email | length == 0)' < mp-lookup-data.json
```
