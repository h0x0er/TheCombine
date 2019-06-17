using System.Collections.Generic;
using BackendFramework.ValueModels;
using BackendFramework.Interfaces;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace BackendFramework.Services
{
    public class WordRepository : IWordRepository
    {
        private readonly IWordContext _wordDatabase;

        public WordRepository(IWordContext collectionSettings)
        {
            _wordDatabase = collectionSettings;
        }
        public async Task<List<Word>> GetAllWords()
        {
            return await _wordDatabase.Words.Find(_ => true).ToListAsync();
        }

        public async Task<List<Word>> GetWords(List<string> Ids)
        {
            var filterDef = new FilterDefinitionBuilder<Word>();
            var filter = filterDef.In(x => x.Id, Ids);
            var wordList = await _wordDatabase.Words.Find(filter).ToListAsync();

            return wordList;
        }

        public async Task<bool> DeleteAllWords()
        {
            var deleted = await _wordDatabase.Words.DeleteManyAsync(_ => true);
            await _wordDatabase.Frontier.DeleteManyAsync(_ => true);
            if (deleted.DeletedCount != 0)
            {
                return true;
            }
            return false;
        }

        public async Task<Word> Create(Word word)
        {
            await _wordDatabase.Words.InsertOneAsync(word);
            await AddFrontier(word);
            return word;
        }

        public async Task<Word> Add(Word word)
        {
            await _wordDatabase.Words.InsertOneAsync(word);
            return word;
        }

        public async Task<List<Word>> GetFrontier()
        {
            return await _wordDatabase.Frontier.Find(_ => true).ToListAsync();
        }
        public async Task<Word> AddFrontier(Word word)
        {
            await _wordDatabase.Frontier.InsertOneAsync(word);
            return word;
        }
        public async Task<bool> DeleteFrontier(string Id)
        {
            var deleted = await _wordDatabase.Frontier.DeleteManyAsync(x => x.Id == Id);
            return deleted.DeletedCount > 0;
        }
    }
}